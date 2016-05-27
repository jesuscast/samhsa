a = open("pillbox_engine_20150511.tab", "r")
b = a.read()
c = [ n.split('\t') for n in b.split('\n') ]
keys = c[0]
final = []
for i in range(1, len(c)):
	final.append({})
	for j in range(64):
		try:
			final[i-1][keys[j]] = c[i][j]
		except:
			continue

for n in final:
	if 'medicine_name' in n:
		if 'naltrexone' in n['medicine_name'].lower():
			print n['medicine_name']+'	' + n['splimage']