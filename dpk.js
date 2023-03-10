const crypto = require("crypto");

function createHash(str) {
  return crypto.createHash("sha3-512").update(str).digest("hex")
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let partitionKey = event?.partitionKey;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (!partitionKey) {
    const eventStr = JSON.stringify(event);
    partitionKey = createHash(eventStr);
  }

  if (typeof partitionKey !== "string") {
    partitionKey = JSON.stringify(partitionKey);
  }

  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    partitionKey = createHash(partitionKey)
  }

  return partitionKey;
};