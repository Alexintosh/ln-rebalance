const BN = require('bn.js');

const decodeFromBuffer = require('./decode_from_buffer');

const decimalBase = 10;
const endian = 'be';
const idLen = 8;

/** Decode a short channel id into components

  {
    id: <BOLT 7 Encoded Short Channel Id String>
  }

  @returns
  {
    block_height: <Channel Funding Transaction Inclusion Block Height Number>
    block_index: <Channel Funding Transaction Inclusion Block Position Number>
    output_index: <Channel Funding Transaction Output Index Number>
  }
*/
module.exports = ({id}) => {
  const channelId = new BN(id, decimalBase).toBuffer();

  try {
    const chanId = new BN(id, decimalBase).toArrayLike(Buffer, endian, idLen);

    const channel = decodeFromBuffer({id: chanId});

    return {
      block_height: channel.block_height,
      block_index: channel.block_index,
      output_index: channel.output_index,
    };
  } catch (err) {
    throw new Error('UnexpectedErrorDecodingChannelIdNumber');
  }
};

