// 每天两注财富密码

const RED_BALL_LENGTH = 33;
const BLUE_BALL_LENGTH = 16;
const RED_BALL_NUMBER = 6; // 6个红球
const BLUE_BALL_NUMBER = 1; // 1个蓝球
const RED_BALL = Array.from(
  {
    length: RED_BALL_LENGTH,
  },
  (_, i) => i + 1,
);

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let res = [];
const generateLottery = () => {
  const dummyRedBall = [...RED_BALL];
  let redBallArr = [];
  for (let i = 0; i < RED_BALL_NUMBER; i++) {
    const luckyIndex = random(0, dummyRedBall.length - 1);
    const [luckyRedBall] = dummyRedBall.splice(luckyIndex, 1);
    redBallArr.push(luckyRedBall);
  }
  redBallArr.sort((a, b) => a - b);
  const luckyBlueBall = random(1, BLUE_BALL_LENGTH);
  return [...redBallArr, luckyBlueBall];
};
// C02SK1KCGVC1
const generateHppiness = () => {
  const TIMES = 2;
  while (res.length < TIMES) {
    const lotteryArr = generateLottery();
    res.push(lotteryArr);
  }
  return res;
};

const hapiness = generateHppiness();

console.log('=========', hapiness);
