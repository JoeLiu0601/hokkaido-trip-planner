const dailyTimingDrafts = {
  2: {
    intro: "08:30 從旭川飯店退房，上午行程保留緩衝；15:00 左右到精靈露臺，天黑看燈。17:30–18:30 富良野晚餐後直接回札幌，約 22:00 入住，車程皆為冬季估計。",
    route: "旭川 → 美瑛／上富良野 → 精靈露臺夜景 → 富良野晚餐或沿途補餐 → 札幌 APA",
    stopGroups: [["biei-shrine"],["hinode-park"],["kamifurano-marumasu","kamifurano-mansaku"],["ningle-terrace"],["furano-kumagera","furano-yuiga-doxon"],["apa-sapporo-susukino-ekinishi"],["sapporo-odori"],["sapporo-susukino"]],
    requiredIds: ["biei-shrine","ningle-terrace","apa-sapporo-susukino-ekinishi"],
    flexibleTimings: {"furano-field":{"time":"沿途白天彈性 · 約 10–15 分","duration":"約 10–15 分","optional":true,"note":"富良野雪原是區域景觀，沒有單一確定入口。只在已確認可停車、可進入的觀景處短停，不進農地，也不在雪地路肩停車；時間從公園或午餐緩衝調整。"}},
    rows: [
      ["07:30–08:30","早餐、退房與清車積雪","08:30 從旭川飯店出發，護照、租車資料與隨身用品先備妥。"],
      ["08:30–09:30","開車：旭川 → 美瑛神社","經國道 237 號往美瑛，先抓約 1 小時含停車。風雪時延長並縮短後續戶外點。"],
      ["09:30–10:00","美瑛神社","參拜、拍照約 30 分；御朱印與授與所是否開放依當日公告。",["biei-shrine"],"約 30 分"],
      ["10:00–10:40","開車：美瑛 → 上富良野","沿主要除雪道路前往日之出公園；不為找雪景繞入小路。"],
      ["10:40–11:10","日之出公園短逛","只走已開放且安全的區域；冬季不預設可開車上到夏季展望位置，路滑就略過。",["hinode-park"],"約 30 分"],
      ["11:10–11:30","開車到上富良野午餐店","日之出公園後在上富良野就近用餐，車程與停車先留約 20 分鐘；餐廳二選一，尚未選定。"],
      ["11:30–13:00","上富良野午餐：まるます／まん作二選一","保留燒肉定食與手打蕎麥兩間候選，含候位先留 90 分鐘，只吃其中一間；排隊過久就調整午餐後休息。",["kamifurano-marumasu","kamifurano-mansaku"],"含候位約 1.5 小時"],
      ["13:00–14:30","前往富良野、午餐後休息／彈性時間","含開車到富良野約 30 分鐘，剩餘時間留給咖啡、休息與停車緩衝；15:00 精靈露臺不變。"],
      ["14:30–15:00","開車到新富良野王子飯店、停車","走正式停車場與已開放步道。"],
      ["15:00–17:15","精靈露臺：白天轉夜間燈景","約 15:00 抵達，等天黑看木屋燈光。官方冬季 12:00–20:45；沒有承諾固定點燈分鐘。",["ningle-terrace"],"約 2 小時 15 分"],
      ["17:15–17:30","取車、前往富良野用餐","餐廳尚未指定，留意最後點餐。"],
      ["17:30–18:30","富良野晚餐","くまげら／唯我獨尊二選一，約 18:00–19:00 吃完離開的試排；也可不在市區吃，直接出發沿途補餐。",["furano-kumagera","furano-yuiga-doxon"],"含候位約 1 小時"],
      ["18:30–22:00","開車：富良野 → 札幌 APA","夜間冬季含休息抓約 3.5 小時；沿途用餐則需計入全段，風雪會更晚。"],
      ["22:00–22:40","APA 入住、停車與休息","晚到時間請先通知飯店並核對訂房條款；今晚不再安排大通／薄野。",["apa-sapporo-susukino-ekinishi"],"約 40 分"]
    ],
    notes: ["留在富良野吃到 19:00 才出發，則約 22:30–23:00 抵飯店，風雪可能更晚。","沿途補餐版：17:15 左右離開精靈露臺，餐食與休息一併計入約 4 小時車程緩衝，約 21:15 後到 APA；服務區餐廳營業需事先確認。","大通與薄野仍留在選項，不代表今晚要走完。12/24 市集有結束時間，這版無法保證趕上。"],
    sources: [["精靈露臺冬季時間","https://www.princehotels.com/shinfurano/facilities/ningle-terrace-shop/"],["札幌燈飾活動","https://www.sapporo.travel/white-illumination/"]],
    optionalIds: ["hinode-park","sapporo-odori","sapporo-susukino"]
  },
  3: {
    intro: "08:30 從 APA 出發，童話十字路之後加入天狗山夜景，之後再回運河；四座神社全留會很滿，至少略過一至兩座彈性神社較從容。",
    route: "APA → 神宮／彈性神社 → 小樽午餐 → 大正硝子 → 童話十字路 → 天狗山夜景 → 運河 → APA",
    stopGroups: [["hokkaido-shrine"],["sapporo-fushimi-inari"],["teine-shrine"],["wakadori-naruto-honten"],["otaru-inari-shrine"],["taisho-glass"],["otaru-meruhen-crossing"],["otaru-tenguyama"],["otaru-canal"]],
    requiredIds: ["hokkaido-shrine","wakadori-naruto-honten","taisho-glass","otaru-meruhen-crossing","otaru-canal","otaru-tenguyama"],
    optionalIds: ["sapporo-fushimi-inari","teine-shrine","otaru-inari-shrine"],
    rows: [
      ["08:30–09:00","開車：APA → 北海道神宮","早餐先吃好，市區行車與停車抓約 30 分。"],
      ["09:00–09:50","北海道神宮","主要必去點，留參拜、拍照與步行約 50 分；御守、御朱印依社務所當日開放。",["hokkaido-shrine"],"約 50 分"],
      ["09:50–10:10","開車至札幌伏見稻荷","先完成札幌市內兩座，再向西走，避免從手稻折返札幌。"],
      ["10:10–10:30","札幌伏見稻荷神社","短暫參拜約 20 分；停車／坡道不安全就略過。",["sapporo-fushimi-inari"],"約 20 分"],
      ["10:30–11:15","開車至手稻神社","含市區路口、冬季行車與找車位預留約 45 分。"],
      ["11:15–11:40","手稻神社","前往小樽途中短停；若上午已落後，可直接前往小樽。",["teine-shrine"],"約 25 分"],
      ["11:40–12:30","開車：手稻 → 小樽","走可通行的主要道路／札樽道，含進城停車先抓約 50 分。"],
      ["12:30–13:30","若鶏時代 なると 本店午餐","炸半雞午餐含候位約 1 小時；排隊久就縮短下一座彈性神社。",["wakadori-naruto-honten"],"約 1 小時"],
      ["13:30–14:20","小樽稻荷神社與往返","開車約 20–25 分後參拜約 20–25 分；遇坡道積雪、授與所休息或已落後，就略過。",["otaru-inari-shrine"],"含移動約 50 分"],
      ["14:20–14:45","移車至運河／堺町周邊停車場","確認可停到傍晚，接下來商店街與運河以步行串接，保留取車路程。"],
      ["14:45–15:25","大正硝子館","先逛店；這版不含製作體驗。若預約體驗，需另留時間並減少神社。",["taisho-glass"],"約 40 分"],
      ["15:25–16:10","步行堺町通、童話十字路","商店散步、拍照、短暫暖身；不為了逛完每間店延誤運河。",["otaru-meruhen-crossing"],"含沿途步行約 45 分"],
      ["16:10–16:55","取車、開車到天狗山山麓站","含走回停車場、冬季行車與停車抓 45 分；不是從十字路直接步行上山。"],
      ["16:55–18:25","天狗山夜景與纜車往返","含購票候車、上下山與看景抓 90 分。冬季上山末班 19:48、下山 20:00；遇強風停駛就回市區。",["otaru-tenguyama"],"約 90 分"],
      ["18:25–19:10","開車回運河周邊停車","重新停車並走到運河，若餓先簡單補餐。"],
      ["19:10–19:40","小樽運河夜景","必去段保留約 30 分；不是店家購物時段。",["otaru-canal"],"約 30 分"],
      ["19:40–21:30","取車、開車回 APA","含冬季返程、一次短休息與市區停車，風雪另延長。"],
      ["21:30 之後","飯店附近簡單補餐","不等到此時才吃第一份晚餐，下午或天狗山下山後先吃。"]
    ],
    notes: ["天狗山是新增夜景段，商店仍先逛；若保留四座神社，下午容易延誤，優先略過手稻／小樽稻荷等彈性點。","保留神宮、商店、天狗山與運河時，建議將多出的時間用於 18:00–19:00 晚餐；表內晚返時間是完整密集版。"],
    sources: [["北海道神宮公告","https://www.hokkaidojingu.or.jp/"],["大正硝子館","https://www.otaruglass.com/"],["天狗山冬季營業／票價","https://tenguyama.ckk.chuo-bus.co.jp/hours-and-fees/"],["天狗山山麓停車／交通","https://tenguyama.ckk.chuo-bus.co.jp/access/"]]
  },
  4: {
    intro: "藻岩山夜景是 D4 必去重點；白鳥大橋與幸福之鐘仍待決定，可略過。",
    route: "APA → 登別地獄谷／溫泉街午餐 → 室蘭兩處待決定 → 藻岩山（必去）→ APA",
    stopGroups: [["noboribetsu-valley"],["noboribetsu-onsen-street","noboribetsu-onsen-ichiba","tenkatsu-honten-muroran"],["muroran-hakucho-bridge-view"],["happiness-bell"],["moiwa-yama"]],
    requiredIds: ["noboribetsu-valley","moiwa-yama"],
    optionalIds: ["noboribetsu-onsen-street","noboribetsu-onsen-ichiba","tenkatsu-honten-muroran","muroran-hakucho-bridge-view","happiness-bell"],
    rows: [],
    notes: [],
    sources: [["登別溫泉市場","https://noboribetsu-spa.jp/tw/spot/spot0169/"],["北海道道路資訊","https://info-road.hdb.hkd.mlit.go.jp/"],["藻岩山營業／冬季道路封閉","https://mt-moiwa.jp/guide/"],["NEXCO 車程估算說明","https://www.driveplaza.com/dp/SearchQuick?startPlaceKana=札幌南&arrivePlaceKana=登別東"]]
  },
  5: {
    intro: "D5 白天分組：A 線 10:00 從 APA 出發，中島公園、鰻魚飯與市區休息後搭地鐵前往白色戀人公園。B 線同伴自駕滑雪，15:00 從藻岩山滑雪場離開，約 16:00 在公園入口會合，再一起看燈飾；逛完四人搭同伴的車回 APA。",
    route: "A：APA → 中島公園 → 鰻魚飯 → 休息 → 地鐵宮之澤 → 白色戀人公園；B：滑雪場 15:00 出發 → 約 16:00 公園會合 → 一起開車回 APA",
    stopGroups: [["nakajima-park"],["unagi-nakajima"],["shiroi-koibito-park"]],
    requiredIds: ["nakajima-park","unagi-nakajima","shiroi-koibito-park"],
    rows: [
      ["10:00–10:20","A 線步行：APA → 中島公園","市區觀光組先吃早餐，雪地步行抓約 20 分鐘；同伴自行開車去滑雪。"],
      ["10:20–11:10","中島公園雪景散步","挑公園北側與已清雪步道走約 50 分；日本庭園冬季關閉，太冷就早點到室內。",["nakajima-park"],"約 50 分"],
      ["11:10–11:30","步行到うなぎ仲じま","往公園北側的 Hotel Mystays Premier Sapporo Park 2F，午餐前留約 20 分找路與候位。"],
      ["11:30–12:45","鰻魚飯午餐","先抓 75 分含點餐等候；座位與年末營業請行前確認。",["unagi-nakajima"],"約 75 分"],
      ["12:45–14:45","市區休息／咖啡與自由時間","先保留原本輕鬆的上午安排，下午不加遠處景點；14:45 左右準備出發去會合。"],
      ["14:45–15:45","A 線地鐵：中島公園／薄野 → 大通 → 宮の沢","搭南北線往麻生至大通，轉東西線往宮の沢，在終點下車後步行到白色戀人公園。官方平常步行約 7 分，雪天抓 10–15 分；全段含候車、轉乘與找入口預留 1 小時。"],
      ["15:45–16:00","園區入口等候、室內暖身","A 線先到 Welcome Gate 入口附近，與同伴即時聯絡。B 線另於 15:00 從滑雪場開車出發；此段為會合目標，不保證雪天車程。"],
      ["16:00–18:00","白色戀人公園會合、看燈飾","同伴先停好車再到 Welcome Gate 入口；會合可延至 16:30。一起逛免費庭院、商店與拍照，當季點燈 16:00–19:00；不預設完整付費工廠參觀。",["shiroi-koibito-park"],"約 2 小時，含會合緩衝"],
      ["18:00–19:00","四人搭同伴的車回 APA","不另排回程地鐵，先回飯店停車；含離場、雪天市區行車與停車先留約 1 小時。"],
      ["19:00–20:00","飯店附近晚餐","餐廳與實際時間待討論，不再安排遠處景點。"]
    ],
    notes: ["同伴約 15:00 從滑雪場開車離場，裝備於 D6 歸還。15:00–16:00 只作會合目標，冬季行車、停車與走到入口先預留 60–90 分鐘規劃緩衝，非即時導航估計；延誤可改 16:30 碰面。","燈飾庭院免費；付費區、咖啡及商店各有截止時間，要參觀工廠需提早到並另查最後入場，不把 19:00 當作所有設施關門時間。"],
    sources: [["中島公園","https://www.sapporo.travel/spot/facility/nakajima_park/"],["白色戀人當季燈飾","https://www.shiroikoibitopark.jp/illumination/"],["公園交通與停車","https://www.shiroikoibitopark.jp/park-guide/access.html"],["滑雪場入口","https://sapporo-moiwa.jp/access/"]]
  },
  6: {
    intro: "A 線市區觀光：10:00 從 APA 出發，搭地鐵與巴士到啤酒博物館，步行串接 Ario；Toriton 可步行或搭計程車，下午搭車回市中心。B 線同伴自行開車滑雪，今天不需回飯店取車或停車。",
    route: "APA → 地鐵／188 巴士 → 啤酒博物館 → Ario → Toriton 北8条光星店 → 搭車回市中心 → Pole Town／3COINS → 拉麵悠 → APA",
    stopGroups: [["sapporo-beer-museum"],["ario-sapporo"],["toriton-kita8"],["kinotoya-bake-pole-town"],["3coins-pole-town"],["ramen-haruka"]],
    requiredIds: ["sapporo-beer-museum","ario-sapporo","toriton-kita8","kinotoya-bake-pole-town","3coins-pole-town","ramen-haruka"],
    rows: [
      ["09:15–10:00","早餐、準備出門","午餐安排較晚，早餐先吃飽；確認巴士班次，車由同伴開去滑雪。"],
      ["10:00–11:00","地鐵＋巴士：APA → 啤酒博物館","步行到薄野站，搭南北線往麻生方向到札幌站，北口 2 號乘車處搭 188 巴士至サッポロビール園。含轉乘先留 1 小時，班次不合就提早出發或改計程車，不保證剛好 11:00 到。"],
      ["11:00–12:00","札幌啤酒博物館自行參觀","D6 是週一，不排週一停辦的導覽；若有自行參觀後的付費試飲需求，另留時間。當年度年末營業仍需再查。",["sapporo-beer-museum"],"約 1 小時"],
      ["12:00–13:30","Ario 購物、休息","與博物館相鄰，步行串接；肚子餓可少量點心，留胃口給稍後壽司。",["ario-sapporo"],"約 1.5 小時"],
      ["13:30–14:00","步行／計程車至 Toriton","雪地步行先留約 30 分鐘；太冷或路面不好就搭計程車。到店先取號，無座位預約，實際候位另計。"],
      ["14:00–15:30","Toriton 迴轉壽司午餐","離峰試排仍留 90 分含候位；若要等超過 1 小時，可改鄰近餐廳，或刪減後面的購物時間。",["toriton-kita8"],"含候位約 1.5 小時"],
      ["15:30–16:30","東豐線：東区役所前 → 大通","Toriton 步行到東区役所前站，搭地下鐵東豐線往福住，在大通下車，再循 Pole Town 標示步行往 KINOTOYA。含地面步行、候車與站內移動先留 1 小時；雪地難走或購物袋多可改計程車。"],
      ["16:30–17:00","Pole Town、KINOTOYA 甜點","進地下街後步行；壽司吃飽了就外帶或略過甜點。",["kinotoya-bake-pole-town"],"約 30 分"],
      ["17:00–17:40","3COINS Pole Town","在同一地下街逛約 40 分，購物不必趕，想加逛可用後面的自由時間。",["3coins-pole-town"],"約 40 分"],
      ["17:40–18:30","自由逛街／回飯店休息","保留食慾與體力，晚餐前不再硬塞景點。"],
      ["18:30–19:45","札幌拉麵悠晚餐","從 Pole Town／APA 步行到薄野拉麵橫丁；約 75 分含候位，排隊太久或售完就改附近拉麵店。",["ramen-haruka"],"含候位約 75 分"],
      ["19:45–20:15","步行回 APA","今晚整理採買品與行李，方便明天退房出發洞爺湖。"]
    ],
    notes: ["午餐時間先試排 14:00；若你習慣準時吃，可縮短 Ario，提早到 Toriton 取號，其他購物往後移。","去程 JR 備案：地下鐵さっぽろ步行轉 JR 札幌，搭往白石方向且停靠苗穂的普通列車，下一站苗穂下車，北口步行約 8 分鐘到博物館（雪天另留緩衝）；快速／特急可能不停，先看停靠站。地鐵與 JR 需分別進出閘門。","12/28 的年末特別營業、交通班次與餐廳候位不是已確認預約，當天以實際營運和排隊調整。"],
    sources: [["啤酒博物館利用案內","https://www.sapporobeer.jp/brewery/s_museum/kengaku/"],["博物館巴士／JR 交通","https://www.sapporobeer.jp/brewery/s_museum/access/"],["JR 北海道路線與時刻查詢","https://jrhokkaidonorikae.com/map/map.php"],["札幌地下鐵站內圖","https://www.city.sapporo.jp/st/subway/ekikonaizu/ekikonaizu.html"],["Ario 札幌","https://sapporo.ario.jp/"],["拉麵悠店家資訊","https://www.ramenharuka.com/maps"]]
  },
  7: {
    intro: "07:30 從 APA 退房出發，冬季含休息先抓約 3 小時，約 10:30 到真狩村。提早抵達的時間留給羊蹄山短拍與休息，午餐仍排 11:30；經 SAIRO 展望台到洞爺湖，15:15 左右入住湖畔亭，不排火口。",
    route: "APA → 真狩村 → SAIRO 展望台 → 洞爺湖湖畔 → Toya Kohan Tei",
    stopGroups: [["makkari-village"],["silo-observatory"],["toyako-lake"],["toya-kohan-tei"]],
    requiredIds: ["makkari-village","silo-observatory","toyako-lake","toya-kohan-tei"],
    rows: [
      ["06:30–07:30","早餐、退房與裝行李","一般退房 10:00 前，這版提早 07:30 出發；早餐、清車積雪及加油事先安排好。"],
      ["07:30–10:30","開車：札幌 → 真狩村","以國道 230 號經定山溪、中山峠、留壽都往真狩方向，含中途休息先抓約 3 小時。當日若有峠道風雪或封路，改走已確認可通行路線，真狩可略過。"],
      ["10:30–12:30","真狩村看羊蹄山、休息與午餐","先在可停車、已開放的地方短拍或休息，11:30 後再用午餐，餐廳先不指定；商店與餐廳未必提早開門。山被雲遮住或路滑就休息，不沿農道找角度。",["makkari-village"],"含休息與午餐約 2 小時"],
      ["12:30–13:30","開車：真狩村 → SAIRO 展望台","走已除雪主要道路往洞爺湖，含停車先留約 1 小時。"],
      ["13:30–14:00","SAIRO 展望台","先看高處湖景、買小伴手禮與上洗手間；強風或看不到湖就縮短。",["silo-observatory"],"約 30 分"],
      ["14:00–14:30","開車到洞爺湖溫泉街","下到湖畔飯店區，尋找可用停車位置，避免重複移車。"],
      ["14:30–15:15","洞爺湖湖畔散步","短走約 45 分看湖景；不含遊船，也不排金比羅火口。太冷就直接去飯店等入住。",["toyako-lake"],"約 45 分"],
      ["15:15–16:00","Toya Kohan Tei 入住","一般 15:00 起入住，辦手續、放行李、確認晚餐時段與隔日早餐。",["toya-kohan-tei"],"約 45 分"],
      ["16:00–17:30","溫泉、房內休息","把長途行車後的下午留給泡湯；不用再開車追展望點。"],
      ["17:30–19:00","晚餐","若住宿方案含晚餐，依飯店安排時段；未含餐則在溫泉街找有營業的店，行前確認。"],
      ["19:00 之後","飯店休息","隔天 07:00 要出發函館，今晚整理好行李、確認提早退房，並備妥早餐；飯店早餐 07:00 才開始。"]
    ],
    notes: ["若路況讓抵達洞爺湖延到 15:00 之後，先入住，湖畔改成飯店旁短走；晚到超過 18:00 請通知飯店。","中山峠、國道與高速道路的當天通行情況須出發前確認，這份車程不是積雪時的保證時間。"],
    sources: [["洞爺湖交通與路線","https://www.toya-usu-geopark.org/access1"],["湖畔亭入住／用餐","https://www.toya-kohantei.com/faq/"],["北海道道路資訊","https://info-road.hdb.hkd.mlit.go.jp/"]]
  },
  8: {
    intro: "07:00 從洞爺湖出發，冬季含休息約 3 小時 45 分，先寄行李、加油還車。中午吃小丑漢堡、公園可略過，保留 15:30 到塔購票、16:00–17:30 看日景轉夜景；約 18:30 正式入住。湖畔亭早餐 07:00 開始，這版自備；函館山維持 D9。",
    route: "湖畔亭 → 函館站前寄行李／還車 → 小丑漢堡 → 公園短逛（可略過）／休息 → 五稜郭塔傍晚夜景（重點）→ 飯店入住",
    stopGroups: [["lucky-pierrot-goryokaku"],["goryokaku"],["goryokaku-tower"],["lagent-hakodate-ekimae"]],
    requiredIds: ["lagent-hakodate-ekimae","goryokaku-tower","lucky-pierrot-goryokaku"],
    optionalIds: ["goryokaku"],
    timingOverrides: {"lagent-hakodate-ekimae":{"time":"10:45 寄行李／18:30 入住","duration":"寄放約 20 分＋入住約 30 分","note":"上午先寄行李，一般入住 15:00 起；看完五稜郭塔夜景，約 18:30 回飯店辦理入住。"}},
    rows: [
      ["06:00–07:00","準備早餐、退房與裝行李","07:00 離開湖畔亭；飯店早餐 07:00 才開始，前晚先備好早餐，能否另作安排請問飯店，不預設有外帶服務。出發前清車積雪並確認路況。"],
      ["07:00–10:45","開車：洞爺湖 → 函館站前","經虻田洞爺湖 IC、道央道往大沼公園 IC，再接國道 5 號／函館新道進城；冬季含一次休息、進城先留約 3 小時 45 分。風雪、封路可能更久。"],
      ["10:45–11:05","La'gent Stay 寄行李","先寄大件行李、簡單補充點心；一般入住 15:00 起，正式進房放在回程。",["lagent-hakodate-ekimae"],"約 20 分"],
      ["11:05–12:00","加油、函館站前門市還車","還車地點已確認是函館站前門市。預留約 55 分加油、車況檢查及步行回函館駅前電停；確切店址、提早還車安排與還車截止仍依租車合約，不繞去機場。"],
      ["12:00–12:50","市電：函館駅前 → 五稜郭公園前","函館駅前搭 2 或 5 系統往湯の川，到五稜郭公園前下車，再步行約 15–20 分到塔旁／公園。整段含候車與雪地步行先抓 50 分。"],
      ["12:50–13:50","小丑漢堡五稜郭公園前店","先吃午餐，含候餐先留 1 小時；排隊久就縮短公園，保留傍晚登塔時間。",["lucky-pierrot-goryokaku"],"含候餐約 1 小時"],
      ["13:50–14:20","五稜郭公園短逛（可略過）","有餘裕才去入口附近拍照，先抓 20–30 分鐘，不預設繞完整圈；沒逛到可考慮 D9 早上，也可以不補。",["goryokaku"],"彈性約 20–30 分"],
      ["14:20–15:30","周邊室內休息／候位緩衝","找有營業的咖啡或甜點店休息；不新增必去點。15:30 前回塔旁，不為公園或購物耽誤登塔。"],
      ["15:30–16:00","五稜郭塔購票、候梯","以 16:00 左右到展望台為目標，排隊比預期久就縮短前面的休息；不等到 17:50 停售票才趕到。"],
      ["16:00–17:30","五稜郭塔：日景轉夜景（重點）","留到約 16:30 之後看入夜的星形城郭與市景。此為觀景時段估計，非固定點燈時間；2026–2027 五稜星之夢燈飾尚待官方確認。現行營業至 18:00，17:50 停售票，勿排晚餐後才來。",["goryokaku-tower"],"觀景約 1.5 小時，購票另留 30 分"],
      ["17:30–18:30","市電：五稜郭公園前 → 函館駅前","步行回五稜郭公園前，搭 2 系統往谷地頭或 5 系統往函館どつく前，在函館駅前下車，再步行回飯店；含候車與雪地步行抓 1 小時。"],
      ["18:30–19:00","La'gent Stay 正式入住","取寄放的行李、辦手續與進房，先休息。"],
      ["19:00 之後","站前晚餐／自由休息","依食量就近用餐，把體力留給隔天函館山與跨年。"]
    ],
    notes: ["登塔是 D8 重點，公園可略過，省下的時間留作候車與休息；還車合約時間永遠優先，不為景點延遲還車。","公園外圍步道一圈約 1.8 公里；冬季含拍照先估 45–75 分鐘，短看入口約 20–30 分鐘即可，不必走完整圈。","D9 早上補公園只是備選，不自動加入主線；含市電往返與雪地步行先留約 2–2.5 小時，採用後需提早出門並重估八幡坂／金森時段，保留下午函館山。"],
    sources: [["洞爺湖交通","https://www.toya-usu-geopark.org/access1"],["湖畔亭早餐時間","https://www.toya-kohantei.com/cuisine/"],["La'gent Stay 寄行李／入住","https://lagent.jp/hakodate-ekimae/faq/"],["五稜郭塔時間","https://www.goryokaku-tower.co.jp/price/"],["五稜郭公園外圍步道","https://www.hakodate-jts-kosya.jp/park/goryokaku/scenery/"],["函館市電","https://www.city.hakodate.hokkaido.jp/docs/2014012100939/"]]
  }
};
// Google Maps「立即出發」查閱於 2026/11/03；不是 12/26 路況預報。
const dayFourDriveLegs = {
  outbound: { label: "APA → 登別地獄谷停車場", from: "APAホテル札幌すすきの駅西", to: "登別地獄谷駐車場", minutes: 90, km: 109, buffer: 25 },
  toBridge: { label: "登別 → 祝津公園展望台", from: "登別地獄谷駐車場", to: "祝津公園展望台 室蘭", minutes: 33, km: 35.5, buffer: 15 },
  toCape: { label: "登別 → 地球岬停車場", from: "登別地獄谷駐車場", to: "地球岬駐車場", minutes: 38, km: 34, buffer: 15 },
  bridgeCape: { label: "祝津公園 → 地球岬停車場", from: "祝津公園展望台 室蘭", to: "地球岬駐車場", minutes: 14, km: 8.5, buffer: 15 },
  bridgeMoiwa: { label: "祝津公園 → 藻岩山山麓站", from: "祝津公園展望台 室蘭", to: "もいわ山ロープウェイ山麓駅", minutes: 108, km: 132, buffer: 30 },
  capeMoiwa: { label: "地球岬 → 藻岩山山麓站", from: "地球岬駐車場", to: "もいわ山ロープウェイ山麓駅", minutes: 113, km: 129, buffer: 30 },
  directMoiwa: { label: "登別 → 藻岩山山麓站（略過室蘭）", from: "登別地獄谷駐車場", to: "もいわ山ロープウェイ山麓駅", minutes: 90, km: 108, buffer: 30 },
  hotel: { label: "藻岩山山麓站 → APA", from: "もいわ山ロープウェイ山麓駅", to: "APAホテル札幌すすきの駅西", minutes: 9, km: 3.8, buffer: 15 }
};

function dayFourTime(minutes) {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

function dayFourDriveMinutes(leg, factor) {
  return Math.ceil((leg.minutes * factor + leg.buffer) / 5) * 5;
}

function calculateDayFourScenario(stops, factor = 1.5) {
  const bridge = stops.includes("muroran-hakucho-bridge-view");
  const cape = stops.includes("happiness-bell");
  const rows = [["06:00–06:30", "早餐、清車積雪與準備", "前晚準備簡單早餐，06:30 從 APA 出發。"]];
  const legIds = [];
  let clock = 6 * 60 + 30;
  let drivingMinutes = 0;
  const add = (duration, title, note, ids, stay) => {
    rows.push([`${dayFourTime(clock)}–${dayFourTime(clock + duration)}`, title, note, ids, stay]);
    clock += duration;
  };
  const drive = key => {
    const leg = dayFourDriveLegs[key];
    const duration = dayFourDriveMinutes(leg, factor);
    legIds.push(key); drivingMinutes += duration;
    add(duration, `開車：${leg.label}`, `Google 11/03 即時參考 ${leg.minutes} 分、${leg.km} 公里；行車 ×${factor} 後另加 ${leg.buffer} 分取車、短休息／停車步行，再向上取整至 5 分鐘。這是規劃情境，不是當日路況保證。`);
  };
  drive("outbound");
  add(60, "登別地獄谷", "走當日開放的步道，保留雪地步行時間。", ["noboribetsu-valley"], "約 1 小時");
  add(45, "登別溫泉街散步／暖身", "先短逛，不在午餐前吃太飽。", ["noboribetsu-onsen-street"], "約 45 分");
  if (clock < 11 * 60) add(11 * 60 - clock, "午餐前緩衝", "等供餐、暖身與休息。");
  add(60, "溫泉街午餐", "先以溫泉市場為候選，依現場候位決定；若改吃室蘭天勝需另估路線。", ["noboribetsu-onsen-ichiba", "tenkatsu-honten-muroran"], "含候位約 1 小時");
  if (bridge) {
    drive("toBridge");
    add(25, "白鳥大橋（祝津公園展望台）· 待決定", "可略過；藻岩山優先，時間落後就不繞室蘭。", ["muroran-hakucho-bridge-view"], "約 25 分");
  }
  if (cape) {
    drive(bridge ? "bridgeCape" : "toCape");
    add(30, "幸福之鐘／地球岬 · 待決定", "可略過，導航地球岬停車場，預留雪地步行。", ["happiness-bell"], "約 30 分");
  }
  drive(cape ? "capeMoiwa" : bridge ? "bridgeMoiwa" : "directMoiwa");
  const moiwaArrival = clock;
  if (clock < 16 * 60) add(16 * 60 - clock, "山麓周邊休息與暖身", "較早抵達就保留休息，16:00 再開始上山；若另回 APA 或繞行，須額外加入移動時間。");
  add(150, "藻岩山夜景、纜車上下山（必去）", "含購票、排隊、轉乘、觀景與下山預留 2.5 小時。冬季纜車至 22:00、上山末班 21:30，迷你纜車至 21:50；停駛仍以官方營運為準。", ["moiwa-yama"], "含候車約 2.5 小時");
  const moiwaFinish = clock;
  drive("hotel");
  return { rows, legIds, drivingMinutes, moiwaArrival, moiwaFinish, hotelArrival: clock, exceedsOperatingWindow: moiwaFinish > 21 * 60 + 50, bridge, cape };
}

function buildDayFourTimingDraft(stops) {
  const normal = calculateDayFourScenario(stops, 1.5);
  const conservative = calculateDayFourScenario(stops, 2);
  const direct = calculateDayFourScenario([], 2);
  const stopsLabel = normal.bridge && normal.cape ? "白鳥與幸福之鐘暫保留，兩處仍待決定" : normal.bridge ? "只保留白鳥大橋備選" : normal.cape ? "只保留幸福之鐘備選" : "略過室蘭兩處，午餐後直接回札幌";
  return { ...dailyTimingDrafts[4],
    intro: `藻岩山夜景必去；${stopsLabel}。本表以 11/03 Google 車程 ×1.5＋各段停車／休息緩衝試排；×2 情境約 ${dayFourTime(conservative.moiwaArrival)} 抵藻岩山山麓站，詳細依據可展開查看。`,
    route: `APA → 登別地獄谷／溫泉街午餐${normal.bridge ? " → 白鳥大橋（待決定）" : ""}${normal.cape ? " → 幸福之鐘（待決定）" : ""} → 藻岩山（必去）→ APA`,
    rows: normal.rows,
    driveReview: { normal, conservative },
    notes: [
      `×2 是保守試算，不是雪季固定倍率或保證上限。若每段都按 ×2＋緩衝，目前路線約 ${dayFourTime(conservative.moiwaArrival)} 抵山麓，按相同觀景安排約 ${dayFourTime(conservative.moiwaFinish)} 完成下山。${conservative.exceedsOperatingWindow ? "這會超過迷你纜車 21:50 營業時間，不能直接照走；請優先刪減室蘭備選，保留藻岩山。" : "仍需依當天路況、排隊與運行調整。"}`,
      `白鳥與幸福之鐘尚未替你刪除。若兩處都略過，即使以 ×2＋緩衝估算，也約 ${dayFourTime(direct.moiwaArrival)} 抵山麓、${dayFourTime(direct.hotelArrival)} 回 APA，藻岩山時間較充足。`,
      "天勝僅是改選午餐備案；選用後隱藏不適用的固定時段。封路、暴風雪或纜車停駛不能靠倍率推算，出發前查道路與運行資訊。"
    ]
  };
}
dailyTimingDrafts[4] = buildDayFourTimingDraft(["muroran-hakucho-bridge-view", "happiness-bell"]);

const dayTwoBackupTimingDraft = {
  intro: "天候備案獨立試排：08:30 從旭川退房，走道央道回札幌，下午白色戀人公園，宮之森教會僅在當晚對一般旅客開放時前往。嚴重風雪時以安全抵達札幌為主。",
  route: "旭川 → 砂川休息 → APA 寄行李 → 白色戀人公園 → 宮之森教會（確認開放才去）→ 薄野 → APA 入住",
  stopGroups: [["sunagawa-highway-oasis"], ["apa-sapporo-susukino-ekinishi"], ["shiroi-koibito-park"], ["miyanomori-frances-church"], ["sapporo-susukino"]],
  requiredIds: ["apa-sapporo-susukino-ekinishi", "shiroi-koibito-park", "sapporo-susukino"],
  optionalIds: ["miyanomori-frances-church"],
  timingOverrides: {
    "apa-sapporo-susukino-ekinishi": { time: "13:00 寄行李／19:45 入住", duration: "寄放約 30 分＋晚間入住", note: "一般入住 15:00 起，中午抵達先詢問寄放行李；白色戀人與晚餐回來再正式入住，寄放及停車請飯店確認。" }
  },
  rows: [
    ["08:30–10:00", "旭川退房、開車到砂川", "先確認道央道通行，再安排約 1.5 小時含冬季緩衝。"],
    ["10:00–10:30", "砂川 Highway Oasis 休息", "短暫採買、點心與洗手間；不是額外排一份正餐。", ["sunagawa-highway-oasis"], "約 30 分"],
    ["10:30–12:00", "繼續開車回札幌", "含進城先抓 1.5 小時；大雪就直接飯店，下午備案可刪減。"],
    ["12:00–13:00", "札幌市區午餐", "就近找簡單午餐，避免再等熱門餐廳。"],
    ["13:00–13:30", "APA 先寄行李", "15:00 才是一般入住時間；先確認寄放與停車方式，正式入住排晚上。", ["apa-sapporo-susukino-ekinishi"], "約 30 分"],
    ["13:30–14:30", "開車至白色戀人公園", "含札幌市區車程、停車與步行約 1 小時。"],
    ["14:30–16:30", "白色戀人公園", "先逛付費區或商店，16:00 後再看庭院燈景；當季正式營業、票券與點燈依官網。", ["shiroi-koibito-park"], "約 2 小時"],
    ["16:30–17:15", "開車至宮之森教會", "先電話確認 12/24 一般參觀與點燈，未開放就直接回薄野。"],
    ["17:15–17:45", "宮之森佛朗西斯教會（條件式）", "這是暫抓的夜間參觀時段，不是已確認開放；婚禮、包場或聖誕活動限制時略過。", ["miyanomori-frances-church"], "約 30 分"],
    ["17:45–18:30", "開車回 APA、步行到薄野", "先停好車，再步行用餐。"],
    ["18:30–19:45", "薄野晚餐", "餐廳依現場候位，吃完回 APA 正式辦理入住。", ["sapporo-susukino"], "約 75 分"],
    ["19:45 之後", "APA 正式入住、休息", "今天不再加大通公園，把雪天長途移動後的時間留給休息。"]
  ],
  notes: ["這份只在 Day 2 已改用天候備案時顯示，並不與富良野主線並行；嚴重風雪也不代表札幌市區一定適合繼續移動。"],
  sources: [["白色戀人公園", "https://www.shiroikoibitopark.jp/"], ["宮之森教會", "https://www.j-mfc.com/"], ["北海道道路資訊", "https://info-road.hdb.hkd.mlit.go.jp/"]]
};
