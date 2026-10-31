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
# From the client's current Squarespace site (themaliburesortmotel.com)
'sunset-gulf.jpg':'https://images.squarespace-cdn.com/content/v1/66cfa34cca45f52ace438831/1790273033045-E383NNEPO5BLRQ5PT2K0/unsplash-image-xHe0i1Kqtog.jpg?format=2500w',
'crusty-pelican-logo.jpg':'https://images.squarespace-cdn.com/content/v1/66cfa34cca45f52ace438831/0050f79c-b143-4a4f-a4da-589f6a64d253/Crusty+Pelican+Logo.jpg?format=2500w',
'pool-wide.jpg':'https://images.squarespace-cdn.com/content/v1/66cfa34cca45f52ace438831/1724883789352-4GVVHK68S74VEVTP6Z23/338614415.jpg?format=2500w',
'exterior.jpg':'https://images.squarespace-cdn.com/content/v1/66cfa34cca45f52ace438831/1724883789348-8YRATQSZFSX2I3T909PI/Malibu-Resort-Motel+%282%29.jpg?format=2500w',
'room-tropical-suite-living.jpg':'https://images.squarespace-cdn.com/content/v1/66cfa34cca45f52ace438831/3bc63479-3b9c-4354-b886-d25110a88517/Malibu+Tropical+One+Bedroom+Apartment.jpg?format=2500w',
'room-tropical-suite-kitchen.jpg':'https://images.squarespace-cdn.com/content/v1/66cfa34cca45f52ace438831/e60a3a98-437f-4cab-9c81-7597bcd2c5df/Malibu+Additional+Tropical+One+Bedroom+Apartment.jpg?format=2500w',
'room-standard-double-2.jpg':'https://images.squarespace-cdn.com/content/v1/66cfa34cca45f52ace438831/826f1627-efb5-4de3-81d5-32279aed778e/Malibu+Standard+Double+Room.jpg?format=2500w',
'guide-fort-de-soto.jpg':'https://images.squarespace-cdn.com/content/v1/66cfa34cca45f52ace438831/1724883789372-WZSMFMWXSFELZDQVIUH8/tripadvisor_honors_four_st_20pete_clearwater_beaches_photo_tjaden_fortdesoto_jpg_1200_630_5300b249-02d9-4b32-a018-12861df822fb.rendition.jpg?format=2500w',
'guide-johns-pass.jpg':'https://images.squarespace-cdn.com/content/v1/66cfa34cca45f52ace438831/1724883789375-Q7ORFT4UQ8X03YXSXTS0/shorelinegiftshops.jpg?format=2500w',
'guide-busch-gardens.jpg':'https://images.squarespace-cdn.com/content/v1/66cfa34cca45f52ace438831/1724883789378-D0XQT4Z8WGRNL6F7PYJT/Iron-Gwazi-Drone_Scope_A74CF5C4-5056-A36A-086131BBC26305E2-a74ce9ed5056a36_a74cfcbc-5056-a36a-089c7b4062fd46e9.jpg?format=2500w',
'guide-st-pete-beach.jpg':'https://images.squarespace-cdn.com/content/v1/66cfa34cca45f52ace438831/1724883789341-LVFZJ39T22DOF56UR1RD/stpetersburg-StPeteBeach-Panodrone-NPCC-1-_BA76BEF2-5056-A36A-0787A0A6ED7B8DD9-ba76abd15056a36_ba7708bb-5056-a36a-07f38d10789ca24d.jpg?format=2500w',
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
