#
# Browser Interactions
#
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
import requests

import time
import sys
import json
#
# The selenium wrapper class contains two main functions that remove the need to specify whether
# the selector is a css selector or a xpath. It also has a function to produce a driver element with
# standard setup.
#
class SeleniumWrapper:
	def __init__(self):
		self.html_tags = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"]
		self.driver = None
	def generate_driver(self):
		tempDriver = webdriver.Firefox()
		tempDriver.set_script_timeout(10)
		tempDriver.set_page_load_timeout(10)
		tempDriver.implicitly_wait(10)
		return tempDriver
	def get_element(self, selector, father = None):
		father = self.driver if father == None else father
		if selector == "":
			return father
		elif (selector[0] == '.' and './/' not in selector) or selector[0] == '#' or selector.split(' ')[0] in self.html_tags:
			return father.find_element_by_css_selector(selector)
		else:
			return father.find_element_by_xpath(selector)
	def get_elements(self, selector, father = None):
		father = self.driver if father == None else father
		if selector == "":
			return [father]
		elif (selector[0] == '.' and './/' not in selector) or selector[0] == '#' or selector.split(' ')[0] in self.html_tags:
			return father.find_elements_by_css_selector(selector)
		else:
			return father.find_elements_by_xpath(selector)


exclude = [
	"http://www.heroinanonymous.org/HAwhatis.html",
	"http://www.heroinanonymous.org/HAorder.html",
	"http://www.heroinanonymous.org/HAformats.html",
	"http://www.heroinanonymous.org/HAbulletin1.html",
	"http://www.heroinanonymous.org/HAconvention1.html"
]

class Interactions(SeleniumWrapper):
	def __init__(self):
		SeleniumWrapper.__init__(self)
		self.url = 'http://www.heroinanonymous.org/HAUS.html'
		self.base = 'http://www.heroinanonymous.org/'
		self.driver = webdriver.Firefox()
		self.links = []
		self.names = []
		self.data = {}
	def start(self):
		self.driver.get(self.url)
		time.sleep(2)
		for n in self.driver.find_elements_by_css_selector('ul:not(.nav) li a'):
			k = n.get_attribute('href')
			if k not in exclude:
				self.links.append(k)
				self.names.append(n.get_attribute('innerHTML'))
		print len(self.links)
	def get_table_data(self):
		table = self.get_elements('.meetingtable')
		extracted_data = []
		if len(table) != 0:
			i = 0
			for tr in self.get_elements('tr', table[0]):
				if i == 0:
					i += 1
					continue
				tds_vals = [ n.get_attribute('innerHTML') for n in self.get_elements('td', tr) ]
				extracted_data.append({
					'day' : tds_vals[0],
					'time': tds_vals[1],
					'name': tds_vals[2],
					'location': tds_vals[3],
					'contact': tds_vals[4]
				})
				i += 1
		return extracted_data
	def go(self):
		for index, n in enumerate(self.links):
			self.driver.get(n)
			time.sleep(2)
			inner_links = [ n.get_attribute('href') for n in self.get_elements('.table1 li a') ]
			inner_names = [ n.get_attribute('innerHTML') for n in self.get_elements('.table1 li a') ]
			self.data[self.names[index]] = {}
			try:
				if 'province' in self.get_elements('.locate')[0].get_attribute('innerHTML').lower():
					for index_inner, k in enumerate(inner_links):
						self.data[self.names[index]][inner_names[index_inner]] = {}
						self.driver.get(k)
						time.sleep(2)
						inner_inner_links = [ n.get_attribute('href') for n in self.get_elements('.table1 li a') ]
						inner_inner_names = [ n.get_attribute('innerHTML') for n in self.get_elements('.table1 li a') ]
						for index_inner_inner, q in enumerate(inner_inner_links):
							self.driver.get(q)
							time.sleep(2)
							self.data[self.names[index]][inner_names[index_inner]][inner_inner_names[index_inner_inner]] = self.get_table_data()
							time.sleep(2)
				else:
					for index_inner, k in enumerate(inner_links):
						self.driver.get(k)
						time.sleep(2)
						self.data[self.names[index]][inner_names[index_inner]] = self.get_table_data()
						time.sleep(2)
			except:
				print 'This city is probably not yet accepted'
			print len(self.data)


if __name__=="__main__":
	i = Interactions()
	i.start()
	i.go()
	f  = open('results.json', 'w')
	f.write(json.dumps(i.data))
	f.close()



import types
import json
f = open('results.json','r')
a = f.read()
f.close()
j = json.loads(a)

import requests
import types
import time
import warnings

warnings.simplefilter('ignore')
for key in j:
	for sub_key in j[key]:
		for i, n in  enumerate(j[key][sub_key]):
			if types.DictType == type(n):
				try:
					r = requests.get('https://maps.googleapis.com/maps/api/geocode/json?address='+n['location']+'&key=AIzaSyAcUAC1zMISi1kSyTh5k-3apk1kTPDddqc')
					j_i = r.json()
					location = j_i['results'][0]['geometry']['location']
					# location = geolocator.geocode(n['location'])
					if location:
						j[key][sub_key][i]['latitude'] = location['lat']
						j[key][sub_key][i]['longitude'] = location['lng']
						print 'Success for '+n['location']
					else:
						j[key][sub_key][i]['latitude'] = 'n/a'
						j[key][sub_key][i]['longitude'] = 'n/a'
						print '	Bad for '+n['location']
				except:
					print 'An error occurred'
					j[key][sub_key][i]['latitude'] = 'n/a'
					j[key][sub_key][i]['longitude'] = 'n/a'


f = open('results.json','w')
f.write(json.dumps(j))
f.close()