'use strict';
import config from '../set-up/config';
import {
  OrganizationClient
} from '../set-up/client';
import invokeFunc from '../set-up/invoke';
const shopClient = new OrganizationClient(config.channelName, config.orderer, config.shopOrg.peer, config.shopOrg.ca, config.shopOrg.admin);
(async () => {
  try {
    await Promise.all([shopClient.login()]);
  } catch(e) {
    console.log('Fatal error logging into blockchain organization clients!');
    console.log(e);
    process.exit(-1);
  };
  await Promise.all([shopClient.initEventHubs()]);
  invokeFunc("sample_user", shopClient, config.chaincodeId, config.chaincodeVersion, "move", ["a", "b", "10"]);
})();