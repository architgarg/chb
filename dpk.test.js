const crypto = require("crypto");
const {deterministicPartitionKey} = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("should return trivial partition key when no event is passed", () => {
    const expected = "0";
    const actual = deterministicPartitionKey();
    expect(actual).toEqual(expected);
  });

  it("should return partition key when event has string partition key", () => {
    const event = {partitionKey: "my-partition-key"};
    const expected = "my-partition-key";
    const actual = deterministicPartitionKey(event);
    expect(actual).toEqual(expected);
  });

  it("should return partition key as string when event has non-string partition key", () => {
    const event = {partitionKey: 123456789};
    const expected = "123456789";
    const actual = deterministicPartitionKey(event);
    expect(actual).toEqual(expected);
  });

  it("should return hash of partition key when event partition key is too long", () => {
    const aLongString = "a".repeat(300);
    const event = {partitionKey: aLongString};
    const expected = crypto.createHash("sha3-512").update(aLongString).digest("hex")
    const actual = deterministicPartitionKey(event);
    expect(actual).toEqual(expected);
  });

  it("should return hash of event data when event has no partition key", () => {
    const event = {data: "some data"};
    const dataHash = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    const expected = dataHash;
    const actual = deterministicPartitionKey(event);
    expect(actual).toEqual(expected);
  });
});