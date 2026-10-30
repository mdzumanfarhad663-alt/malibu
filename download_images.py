import concurrent.futures, urllib.request, pathlib
root=pathlib.Path(__file__).resolve().parent/'assets/images'
items={
'logo.png':'https://images.squarespace-cdn.com/content/v1/66cfa34cca45f52ace438831/1724883794190-LBUEUDP8XOQWDQXSRGVK/malibu+logo.png',
'pool-main.jpg':'https://h-img3.cloudbeds.com/uploads/245933/f_adsf~~65f0af61620ca.jpg',
'property-front.jpg':'https://h-img1.cloudbeds.com/uploads/245933/fafasdfaew~~65f0af667bad1.jpg',
'beach.jpg':'https://h-img2.cloudbeds.com/uploads/245933/redington-beach-preview~~65f0af6716be8.jpg',
'pool-deck.jpg':'https://h-img2.cloudbeds.com/uploads/245933/listing_photos-9~~6ad7cc9e96fde.jpg',
'property-01.jpg':'https://h-img3.cloudbeds.com/uploads/245933/new_photos44~~6ad7cbfc351d1.jpg',
'property-02.jpg':'https://h-img1.cloudbeds.com/uploads/245933/new_photos40~~6ad7cbbd89e47.jpg',
'property-03.jpg':'https://h-img1.cloudbeds.com/uploads/245933/new_photos5~~6ad7cbd5ea96b.jpg',
'property-04.jpg':'https://h-img1.cloudbeds.com/uploads/245933/new_photos7~~6ad7cbd6d2319.jpg',
'property-05.jpg':'https://h-img3.cloudbeds.com/uploads/245933/new_photos1~~6ad7cbd6bd4ca.jpg',
'property-06.jpg':'https://h-img3.cloudbeds.com/uploads/245933/new_photos50~~6ad7cbd5d87e4.jpg',
'room-standard-king.jpg':'https://h-img2.cloudbeds.com/uploads/245933/listing_photos-16~~6ad7ca65e8d4b.jpg',
'room-king-efficiency.jpg':'https://h-img2.cloudbeds.com/uploads/245933/new_photos24~~6ad7ca8e81c15.jpg',
'room-standard-double.jpg':'https://h-img2.cloudbeds.com/uploads/245933/new_photos44~~6ad7cabbcb91e.jpg',
'room-double-efficiency.jpg':'https://h-img3.cloudbeds.com/uploads/245933/new_photos34~~6ad7cb023aec0.jpg',
'room-apartment.jpg':'https://h-img3.cloudbeds.com/uploads/245933/new_photos11~~6ad7fbc9d4a05.jpg',
'room-tropical-suite.jpg':'https://h-img2.cloudbeds.com/uploads/245933/listing_photos-1~~6ad7cb4076761.jpg'}
def get(item):
 name,url=item
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
  with urllib.request.urlopen(req,timeout=30) as r: (root/name).write_bytes(r.read())
  return name,'ok'
 except Exception as e:return name,str(e)
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
 for result in ex.map(get,items.items()):print(*result)
