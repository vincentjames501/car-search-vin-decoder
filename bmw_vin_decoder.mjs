import fetch from 'node-fetch';

export const getCodes2 = async (vin) => {
  const globalRegex = /<tr><td align='center' width='20%'>([A-Za-z0-9]{5})<\/td><td align='left'>/g;
  const specificRegex = /<tr><td align='center' width='20%'>([A-Za-z0-9]{5})<\/td><td align='left'>/;
  const last7OfVIN = vin.substring(vin.length - 7, vin.length).toLowerCase();
  const response = await fetch(`https://www.mdecoder.com/decode/${last7OfVIN}`, {
    credentials: 'include',
    headers: {
      'authority': 'www.mdecoder.com',
      'cache-control': 'max-age=0',
      'origin': 'https://www.mdecoder.com',
      'upgrade-insecure-requests': '1',
      'content-type': 'application/x-www-form-urlencoded',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'referer': `https://www.mdecoder.com/decode/${last7OfVIN}`,
      'accept-language': 'en-US,en;q=0.9',
      'cookie': '__cfduid=d5fc148ff6d1c362c80e9be16aa4b1c951551145104; _ga=GA1.2.1388037186.1552528224; _gid=GA1.2.994554704.1552528224; _gat=1; XSRF-TOKEN=eyJpdiI6ImIwVnlqNlRYVDJxZWJQSTlndHE1RHc9PSIsInZhbHVlIjoiWDg5MkZlRUVleHRNcnFNMFdwMjhYZXRKNnpzT2ZGK04rVHMxUlBCS2xxdGhGa2lENVN4RHFTZTFKaXNkaGZiWll6Z09lMXFIaVJGNWVINVZERHFRMFE9PSIsIm1hYyI6IjNlODU1MDIwYTEwMGIwMmVlNzljYWFhMGQ0N2ZhNDljYTEwYWIwMzAzZmQ3ZTllZGU0N2EwNmRiYTZjZTAzZjEifQ%3D%3D; laravel_session=eyJpdiI6ImFNUzJJN1FwQVZjeHZqYUhyenhBQUE9PSIsInZhbHVlIjoiZFBVXC9adG9YVitOK045UmRDNGhickVyT0FaMUZNaDlKcGRONVF6TTE4UTZTWTNEU1BVYkpvSmJROHZwbW5qM2cxeGZUTERoVHpiZGhFWTNsYldyOXRBPT0iLCJtYWMiOiI3NTM1M2MzZThmZTlmZTQ5ZmVmZThhNmZmYjJiYjdlYzM4Y2RmYTYxODM4OWU3YTM0MjViNzhhNTgxMTgwZjAyIn0%3D'
    },
    method: 'POST',
    body: 'g-recaptcha-response=03AOLTBLRKDIjLhK7eTfmHbuyfN5mfhJP_cClszQ7HFp77HsKj9W1zmVqwv5EWKSGiFERBcPac5hLE6vMl2a2WdrpH5k0q-5lgdfM-Vrz_ey4XTrPpc-4iLhwzCy8m91QZyA_mz0-UFeAdr_Phz0uPpenAvKUx_nCnZ9TfyqYwBYgcIEjcDMa4Vn0UTdUWxN-vRO6RWjjNv6Ulcqft9fUStZW05nVUz03ufzt_tMWpToHT8HWzD4icAFhl8UAUuvcxV2Qm-_xnX9u0KdMjD07Lcc5M6MT-oZnd4aNVAZrlStjULTUDNSbUCVDGUun6_268SagdJNWOM1nk&_token=MvFxlDpbB4a2wH83WizK3aAMDVw0lGcl8dYhOHzl&re-patch=7'
  });
  const xml = await response.text();
  const codeRows = xml.match(globalRegex);
  return codeRows ? codeRows.map(row => row.match(specificRegex)[1]) : [];
};

export const getCodes = async (vin) => {
  const last7OfVIN = vin.substring(vin.length - 7, vin.length).toLowerCase();
  const response = await fetch('https://decoder.bvzine.com/checkvin.php', {
    credentials: 'include',
    headers: {
      'Cookie': '_ga=GA1.2.2098914252.1551145107; _fbp=fb.1.1551145107310.1718325994; bafp=36c67020-3967-11e9-9eee-551a95af174d; __qca=P0-969877999-1551145107631; __cfduid=dae60b7b1b8a56d6f7ce9106fd10e227b1551145109; _gid=GA1.2.920071381.1552534695; _gat_UA-85569267-1=1; bfp_sn_rf_8b2087b102c9e3e5ffed1c1478ed8b78=https://f30.bimmerpost.com/forums/showthread.php; bfp_sn_pl=1552534695_412885666697; _cmpQcif3pcsupported=1; site_verification=1; bfp_sn_rt_8b2087b102c9e3e5ffed1c1478ed8b78=1552534716724; session_depth=decoder.bvzine.com%3D2%7C424430677%3D2%7C756115814%3D2',
      'Origin': 'https://decoder.bvzine.com',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*',
      'Referer': 'https://decoder.bvzine.com/',
      'X-Requested-With': 'XMLHttpRequest',
      'Connection': 'keep-alive'
    },
    method: 'POST',
    body: `vin=${last7OfVIN}&secondVin=false&admin=false&rewrite=false&g_recaptcha_response=03AOLTBLT2CRstfsFbe7Chx08sG3E6MdGBINENZhNZ9Rm1zfsuWKFE13OFrAwmNwhvneYElr4T-y-5pqUkl016GGMpVsyvk6fxMz5N8cj2_A6TlfID9-aP_w9kFY8cxGVeEaABJZTXdFVW2LDMVA13G51H1RYwTUPr4_mY_IH6BfiJNevXUaMr2uJjEHtLOD3xgYQ3gHleWV2pR9tfQip6wL2YLLBpvmPQIR0awIdzbAFjr2jsVuDnELhrbIDBIavZ70adHA7aqWzy9fucgp59UluKqskGwXTw_j3Yc6hGEsxn10bjmDElh6dW9lfasBKGo4NVamCu2UqQ`
  });
  const payload = await response.json();
  return payload.vin.vinData.Option.map(option => Object.keys(option)[0]);
};