(function (root) {
  "use strict";
  const stationIds = ["hokkaido-shikisai-hakodate", "lagent-hakodate-ekimae", "hakodate-station-airport-bus", "hakodate-airport"];
  const originalIds = ["morning-market", "motomachi", "hakodate-station-airport-bus", "hakodate-airport"];
  const stationTiming = {
    "hokkaido-shikisai-hakodate": { time: "10:00–11:00", duration: "採買約 45–60 分", note: "先吃早餐、10:00 前退房寄行李，再步行到函館站 1F。以四季彩館與站內甜點為主；11:00–12:00 用餐休息，元旦店家營業待確認，店休就休息、不追店。" },
    "lagent-hakodate-ekimae": { time: "12:15–12:35", duration: "取行李約 20 分", note: "步行回 La’gent Stay 取寄放行李、整理採買品。這站是取行李，不是再次入住；接著走到站前巴士總站 11 號乘車處，13:10 前到站。" },
    "hakodate-station-airport-bus": { time: "13:10 候車／13:30 參考班次", duration: "車程約 20 分＋候車", note: "函館帝產巴士站前 11 號乘車處；2027/1/1 正式班次仍待確認。不符、客滿或延誤就改計程車，不延後去機場。" },
    "hakodate-airport": { time: "14:10 進國際線目標", duration: "18:00 起飛", note: "由國內線側下車後前往國際線 1F，JX861 18:00 起飛；依航空公司通知辦理報到與出境。" }
  };
  const api = {
    stationSupported(ids) {
      return Array.isArray(ids) && ids.includes("hakodate-station-airport-bus") && ids.includes("hakodate-airport")
        && ids.every(id => originalIds.includes(id)) && new Set(ids).size === ids.length;
    },
    ids(day, ids, station) {
      return day === 10 && station && api.stationSupported(ids) ? [...stationIds] : [...(ids || [])];
    },
    timing(day, id, station) {
      return day === 10 && station ? stationTiming[id] || null : null;
    },
    spot(day, spot, station) {
      if (!spot || day !== 10 || !station) return spot;
      if (spot.id === "lagent-hakodate-ekimae") return { ...spot, name: "La’gent Stay 函館站前・取行李", desc: stationTiming[spot.id].note };
      if (spot.id === "hokkaido-shikisai-hakodate") return { ...spot, name: "函館站內逛街・四季彩館", desc: stationTiming[spot.id].note };
      return spot;
    },
    optional(day, id, draft, dayOne) {
      return day === 1 ? dayOne?.[id]?.optional === true : Boolean(draft?.optionalIds?.includes(id));
    },
    progressKey(base, station) { return station ? `${base}-d10-station` : base; }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.HOKKAIDO_TRAVEL_TOOLS = api;
})(typeof window !== "undefined" ? window : {});
