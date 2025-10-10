import contracts from "../../contracts";
import { allowErc20Approve } from "../../helpers";

const wbravUSDC = "0x7309E1E2e74af170c69bdE8FCB30397f8697D5FF";
const usdc = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

const { ethereumGeneralAdapter1 } = contracts.eth.morpho;

const morphoChainlinkOracleV2 = "0x6bac818df5654ea824ce723de51d7c7d9fd2f4ff";
const adaptiveCurveIrm = "0x870ac11d48b15db9a138cf899d20f13f79ba00bc";

const marketParamsScoping = {
  collateralToken: wbravUSDC,
  loanToken: usdc,
  oracle: morphoChainlinkOracleV2,
  irm: adaptiveCurveIrm,
  // do we wanna set a max limit on lltv?
};

export default [
  // authorize ethereumGeneralAdapter1
  allow.eth.morpho.morpho.setAuthorization(ethereumGeneralAdapter1, true),

  // supply wbravUSDC as collateral
  ...allowErc20Approve([wbravUSDC], ethereumGeneralAdapter1),
  allow.eth.morpho.ethereumGeneralAdapter1.erc20TransferFrom(
    wbravUSDC,
    ethereumGeneralAdapter1,
  ),
  allow.eth.morpho.ethereumGeneralAdapter1.morphoSupplyCollateral(
    marketParamsScoping,
    undefined, // all any amount
    c.avatar, // onBehalfOf must be the avatar
    "0x", // data
  ),

  // borrow USDC
  allow.eth.morpho.ethereumGeneralAdapter1.morphoBorrow(
    marketParamsScoping,
    undefined, // assets
    undefined, // shares
    undefined, // minSharePrice
    c.avatar, // receiver must be the avatar
  ),

  // repay USDC
  allow.eth.morpho.ethereumGeneralAdapter1.morphoRepay(
    marketParamsScoping,
    undefined, // assets
    undefined, // shares
    undefined, // maxSharePrice
    c.avatar, // receiver must be the avatar
    "0x", // data
  ),

  // withdraw wbravUSDC collateral
  allow.eth.morpho.ethereumGeneralAdapter1.morphoWithdrawCollateral(
    marketParamsScoping,
    undefined, // assets
    c.avatar, // receiver must be the avatar
  ),
] satisfies Permissions;
