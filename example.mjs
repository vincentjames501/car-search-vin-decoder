import {
  fetchListings
} from './carguru_fetcher.mjs';
import {
  getCodes
} from './bmw_vin_decoder.mjs';

const zip = '94066';
const distance = 150;
const selectedEntity = 'c24539'; // BMW 3 Series
const startYear = 2015;
const endYear = 2017;

const desiredCodes = [
  'S5DFA', // Adaptive Cruise
  'S610A' // Heads Up Display
];

const sleep = async (timeMs) => new Promise(resolve => {
  setTimeout(resolve, timeMs);
});

const processResults = async ([listing, ...listings]) => {
  if (listings.length === 0) {
    console.log('Done');
    return;
  }
  console.log(`Decoding VIN: ${listing.vin}`);
  const codes = await getCodes(listing.vin);

  const matches = desiredCodes.filter(desiredCode => codes.includes(desiredCode));
  if (matches.length === 0) {
    console.log('No matching codes');
  } else {
    console.log(`Car matched:`, matches);
  }

  await sleep(1000);
  processResults(listings);
}

const run = async () => {
  const listings = await fetchListings({
    zip,
    distance,
    selectedEntity,
    startYear,
    endYear
  });

  console.log(`Found ${listings.length} listings.`);
  processResults(listings);
};

run();