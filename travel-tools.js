(function (root) {
  "use strict";
  const stationIds = ["hokkaido-shikisai-hakodate", "hakodate-station-airport-bus", "hakodate-airport"];
  const originalIds = ["morning-market", "motomachi", "hakodate-station-airport-bus", "hakodate-airport"];
  const stationTiming = {
    "hokkaido-shikisai-hakodate": { time: "10:00–13:00", duration: "採買、午餐與休息約 3 小時", note: "10:00 前退房，帶著全部行李步行到函館站。1F 採買伴手禮、紀念品與禮物，11:00–12:00 到 2F 用餐；之後補買、休息，13:00 前整理好行李，13:10 前到站前巴士乘車處。元旦店家營業待確認，餐廳未開就改備餐／外帶。" },
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
      if (spot.id === "hokkaido-shikisai-hakodate") return { ...spot, name: "函館站內採買與午餐", desc: stationTiming[spot.id].note };
      if (spot.id === "hakodate-station-airport-bus") return { ...spot, desc: "逛完車站、吃過午餐後帶齊行李，直接到站前巴士總站 11 號乘車處，13:10 前候車。" + stationTiming[spot.id].note };
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
