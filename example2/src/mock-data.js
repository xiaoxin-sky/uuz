function randMinMax(min, max, round) {
  var val = min + Math.random() * (max - min);
  if (round) val = Math.round(val);
  return val;
}

let staticData = (function() {
  let staticData = [];
  for (var i = 0; i < 10; i = i + 1) {
    staticData.push({
      core: {
        x: randMinMax(0, 1200),
        y: randMinMax(0, 600),
        radius: randMinMax(10, 20),
        start: randMinMax(0, 1) * Math.PI,
        end: randMinMax(1, 2) * Math.PI,
      },
      style: {
        zIndex: -1,
        opacity: randMinMax(0.1, 0.6),
        boxShadow: "#d4f9b0 0 0 16",
        background: Math.random() > 0.5 ? "#79B83D" : "#C93860",
        border: `5 solid #fff`,
      },
    });
  }
  return staticData;
})();

let dynamicData = (function() {
  let dynamicData = [];
  for (var i = 0; i < 100; i = i + 1) {
    dynamicData.push({
      core: {
        x: randMinMax(0, 1200),
        y: randMinMax(0, 600),
        width: randMinMax(10, 20),
        height: randMinMax(10, 20),
        vx: randMinMax(-0.5, 0.5),
        vy: randMinMax(-0.5, 0.5),
      },
      style: {
        zIndex: 1,
        background: Math.random() > 0.5 ? "#79B83D" : "#C93860",
        border: `2 solid #fff`,
        borderRadius: [0, 5, 10, 5],
      },
    });
  }
  return dynamicData;
})();

export default {
  dynamicData,
  staticData,
};
