import { useState, useEffect, useRef, useCallback } from "react";

const A = (arr) => arr; // alias to keep lines short
const EXERCISE_DB = {
  pull: [
    { id:"p1", emoji:"🏋️", en:"Deadlift", zh:"硬拉", muscle_en:"Back / Hamstrings", muscle_zh:"背部 / 腿后", sets:4, reps:8, rest:90, douyinUrl:"https://www.douyin.com",
      tip_en:"Hinge at your hips, keep the bar close to your legs, chest proud.", tip_zh:"髋部铰链发力，杠铃贴腿，挺胸。",
      videoUrl:"",
      cues:["Stand tall","Hip hinge back","Drive through heels","Lock out at top"],
      alts:A([{en:"Dumbbell Deadlift",zh:"哑铃硬拉",why_en:"No barbell needed",why_zh:"无杠铃可用"},{en:"Good Morning",zh:"早安式体前屈",why_en:"Beginner hip hinge",why_zh:"初学者版髋铰动作"},{en:"Kettlebell Swing",zh:"壶铃摆动",why_en:"Teaches explosive hip drive",why_zh:"训练爆发性髋部发力"}]) },
    { id:"p2", emoji:"🔄", en:"Bent-over Row", zh:"俯身划船", muscle_en:"Upper Back / Lats", muscle_zh:"上背 / 背阔肌", sets:3, reps:12, rest:60, douyinUrl:"https://www.douyin.com",
      tip_en:"Hinge 45°, pull elbows past your torso, squeeze shoulder blades.", tip_zh:"上身前倾45度，肘部拉过躯干，夹紧肩胛骨。",
      videoUrl:"",
      cues:["Hinge forward","Pull to belly","Squeeze your back","Lower it slow"],
      alts:A([{en:"Dumbbell Row",zh:"哑铃单臂划船",why_en:"Single arm, easier balance",why_zh:"单臂操作更易平衡"},{en:"Resistance Band Row",zh:"弹力带划船",why_en:"No gym equipment needed",why_zh:"居家即可完成"},{en:"Inverted Row",zh:"澳式引体",why_en:"Bodyweight, great for beginners",why_zh:"自重训练新手友好"}]) },
    { id:"p3", emoji:"💪", en:"Bicep Curl", zh:"弯举", muscle_en:"Biceps", muscle_zh:"二头肌", sets:3, reps:15, rest:45, douyinUrl:"https://www.douyin.com",
      tip_en:"Keep elbows pinned at your sides, full range of motion.", tip_zh:"肘部固定于体侧，完整活动范围。",
      videoUrl:"",
      cues:["Pin your elbows","Squeeze at the top","Lower 3 seconds","No swinging!"],
      alts:A([{en:"Hammer Curl",zh:"锤式弯举",why_en:"Easier on the wrists",why_zh:"对手腕更友好"},{en:"Band Curl",zh:"弹力带弯举",why_en:"No dumbbells needed",why_zh:"无哑铃可用"},{en:"Chin-Up (assisted)",zh:"辅助引体向上",why_en:"Compound bicep builder",why_zh:"复合动作练二头"}]) },
    { id:"p4", emoji:"🦵", en:"Romanian Deadlift", zh:"罗马尼亚硬拉", muscle_en:"Glutes / Hamstrings", muscle_zh:"臀部 / 腿后", sets:3, reps:10, rest:75, douyinUrl:"https://www.douyin.com",
      tip_en:"Push hips back, soft bend in knees, feel the hamstring stretch.", tip_zh:"髋部向后推，膝盖微弯，感受腿后拉伸。",
      videoUrl:"",
      cues:["Push hips back","Soft knee bend","Feel the stretch","Drive hips forward"],
      alts:A([{en:"Single-leg RDL",zh:"单腿罗马尼亚硬拉",why_en:"Improves balance",why_zh:"改善单侧平衡"},{en:"Good Morning",zh:"早安式体前屈",why_en:"No weights needed",why_zh:"无需器械"},{en:"Nordic Curl (assisted)",zh:"辅助北欧腘绳弯举",why_en:"Intense hamstring focus",why_zh:"强化腿后链"}]) },
    { id:"p5", emoji:"🧲", en:"Lat Pulldown", zh:"高位下拉", muscle_en:"Lats / Upper Back", muscle_zh:"背阔肌 / 上背", sets:3, reps:12, rest:60, douyinUrl:"https://www.douyin.com",
      tip_en:"Lean slightly back, pull bar to upper chest, control the return.", tip_zh:"身体微微后仰，拉至胸上部，控制还原。",
      videoUrl:"",
      cues:["Lean back slightly","Pull to your chest","Elbows drive down","Slow return"],
      alts:A([{en:"Pull-Up (assisted)",zh:"辅助引体向上",why_en:"No machine needed",why_zh:"无器械可替代"},{en:"Band Pulldown",zh:"弹力带下拉",why_en:"Home-friendly",why_zh:"居家练背阔肌"},{en:"Straight-arm Pulldown",zh:"直臂下压",why_en:"Great lat isolation",why_zh:"更好孤立背阔肌"}]) },
  ],
  push: [
    { id:"q1", emoji:"🫸", en:"Bench Press", zh:"卧推", muscle_en:"Chest / Shoulders", muscle_zh:"胸部 / 肩部", sets:4, reps:8, rest:90, douyinUrl:"https://www.douyin.com",
      tip_en:"Lower bar to mid-chest, drive up explosively, elbows at 45°.", tip_zh:"杠铃降至胸中部，爆发式上推，肘关节45度。",
      videoUrl:"",
      cues:["Grip shoulder-width","Lower controlled","Elbows at 45°","Drive up explosively"],
      alts:A([{en:"Dumbbell Press",zh:"哑铃卧推",why_en:"Greater range of motion",why_zh:"活动范围更大"},{en:"Push-Up",zh:"俯卧撑",why_en:"No equipment at all",why_zh:"完全不需要器械"},{en:"Floor Press",zh:"地板卧推",why_en:"No bench required",why_zh:"无需卧推凳"}]) },
    { id:"q2", emoji:"🔺", en:"Overhead Press", zh:"过头推举", muscle_en:"Shoulders / Triceps", muscle_zh:"肩部 / 三头肌", sets:3, reps:10, rest:75, douyinUrl:"https://www.douyin.com",
      tip_en:"Press straight overhead, brace your core, lock out at the top.", tip_zh:"垂直上推，核心收紧，顶端锁定。",
      videoUrl:"",
      cues:["Brace your core","Press straight up","Lock out at top","Lower under control"],
      alts:A([{en:"Dumbbell Shoulder Press",zh:"哑铃肩推",why_en:"Easier to learn",why_zh:"动作更易掌握"},{en:"Pike Push-Up",zh:"倒V俯卧撑",why_en:"Bodyweight shoulder press",why_zh:"自重肩推"},{en:"Arnold Press",zh:"阿诺德推举",why_en:"Greater shoulder activation",why_zh:"激活更多肩部肌群"}]) },
    { id:"q3", emoji:"🤸", en:"Push-Up", zh:"俯卧撑", muscle_en:"Chest / Triceps", muscle_zh:"胸部 / 三头肌", sets:3, reps:15, rest:45, douyinUrl:"https://www.douyin.com",
      tip_en:"Hands shoulder-width, lower chest to floor, full lockout at top.", tip_zh:"双手与肩同宽，胸部贴近地面，顶端完全锁臂。",
      videoUrl:"",
      cues:["Straight body line","Chest to the floor","Explode back up","Lock your arms"],
      alts:A([{en:"Knee Push-Up",zh:"跪姿俯卧撑",why_en:"Easier for beginners",why_zh:"初学者友好版本"},{en:"Incline Push-Up",zh:"上斜俯卧撑",why_en:"Reduced load",why_zh:"减轻负荷同样模式"},{en:"Decline Push-Up",zh:"下斜俯卧撑",why_en:"More upper-chest",why_zh:"更多上胸激活"}]) },
    { id:"q4", emoji:"💫", en:"Lateral Raise", zh:"侧平举", muscle_en:"Lateral Deltoid", muscle_zh:"侧束三角肌", sets:3, reps:15, rest:45, douyinUrl:"https://www.douyin.com",
      tip_en:"Slight forward lean, lead with elbows, stop at shoulder height.", tip_zh:"微微前倾，肘部带动，举至肩高停止。",
      videoUrl:"",
      cues:["Lead with elbows","Slight forward lean","Stop at shoulder height","Lower in 3 seconds"],
      alts:A([{en:"Cable Lateral Raise",zh:"绳索侧平举",why_en:"Constant tension",why_zh:"持续张力更佳"},{en:"Band Lateral Raise",zh:"弹力带侧平举",why_en:"Home-friendly",why_zh:"居家可做"},{en:"Upright Row",zh:"直立划船",why_en:"Compound shoulder option",why_zh:"复合肩部选项"}]) },
    { id:"q5", emoji:"🔻", en:"Tricep Dip", zh:"三头肌臂屈伸", muscle_en:"Triceps / Chest", muscle_zh:"三头肌 / 胸部", sets:3, reps:12, rest:60, douyinUrl:"https://www.douyin.com",
      tip_en:"Elbows back (not flared), lower until 90°, press through palms.", tip_zh:"肘部向后（不外展），下降至90度，掌根发力上推。",
      videoUrl:"",
      cues:["Elbows point back","Lower to 90°","Drive through palms","Full arm extension"],
      alts:A([{en:"Bench Dip",zh:"椅子臂屈伸",why_en:"Chair replaces dip bars",why_zh:"用椅子代替双杠"},{en:"Band Pushdown",zh:"弹力带下压",why_en:"Isolation at home",why_zh:"居家孤立三头"},{en:"Diamond Push-Up",zh:"钻石俯卧撑",why_en:"Bodyweight tricep",why_zh:"自重三头燃烧"}]) },
  ],
  legs: [
    { id:"l1", emoji:"🏔️", en:"Squat", zh:"深蹲", muscle_en:"Quads / Glutes", muscle_zh:"股四头肌 / 臀部", sets:4, reps:12, rest:90, douyinUrl:"https://www.douyin.com",
      tip_en:"Chest up, knees track toes, break parallel if mobile.", tip_zh:"挺胸，膝盖追踪脚尖方向，有能力则蹲破平行线。",
      videoUrl:"",
      cues:["Chest tall","Push knees out","Break parallel","Drive through heels"],
      alts:A([{en:"Goblet Squat",zh:"酒杯式深蹲",why_en:"Easier to stay upright",why_zh:"更容易保持挺胸"},{en:"Box Squat",zh:"箱式深蹲",why_en:"Safe way to learn depth",why_zh:"安全掌握下蹲深度"},{en:"Wall Sit",zh:"靠墙静蹲",why_en:"No weights needed",why_zh:"无需任何器械"}]) },
    { id:"l2", emoji:"🦵", en:"Lunge", zh:"弓步蹲", muscle_en:"Glutes / Quads", muscle_zh:"臀部 / 股四头肌", sets:3, reps:10, rest:60, douyinUrl:"https://www.douyin.com",
      tip_en:"Step forward, back knee hovers 1 inch off floor, torso upright.", tip_zh:"向前迈步，后膝悬于地面上方约2cm，上身直立。",
      videoUrl:"",
      cues:["Big step forward","Back knee hovers","Stay tall","Push front heel"],
      alts:A([{en:"Reverse Lunge",zh:"后撤步蹲",why_en:"Easier on the knees",why_zh:"对膝盖更友好"},{en:"Split Squat",zh:"分腿蹲",why_en:"Great glute activation",why_zh:"更好激活臀部"},{en:"Step-Up",zh:"台阶踏步",why_en:"Just need a step",why_zh:"只需一个台阶"}]) },
    { id:"l3", emoji:"🍑", en:"Hip Thrust", zh:"臀桥", muscle_en:"Glutes / Hamstrings", muscle_zh:"臀部 / 腿后", sets:3, reps:15, rest:60, douyinUrl:"https://www.douyin.com",
      tip_en:"Drive hips to ceiling, squeeze glutes at top, chin down.", tip_zh:"臀部推向天花板，顶部夹紧，下巴微收。",
      videoUrl:"",
      cues:["Drive hips up","Squeeze at the top","Hold 1 second","Lower slowly"],
      alts:A([{en:"Glute Bridge",zh:"仰卧臀桥",why_en:"No bench, done on floor",why_zh:"躺地即可完成"},{en:"Single-leg Hip Thrust",zh:"单腿臀桥",why_en:"More glute isolation",why_zh:"更好孤立单侧臀部"},{en:"Donkey Kick",zh:"驴踢腿",why_en:"Home-friendly",why_zh:"无需器械居家首选"}]) },
  ],
  core: [
    { id:"c1", emoji:"🧘", en:"Plank", zh:"平板支撑", muscle_en:"Core / Abs", muscle_zh:"核心 / 腹部", sets:3, reps:40, rest:45, isTime:true, douyinUrl:"https://www.douyin.com",
      tip_en:"Straight line head-to-heel, squeeze glutes and abs, breathe.", tip_zh:"头到脚跟成一条直线，臀部和腹部收紧，正常呼吸。",
      videoUrl:"",
      cues:["Head neutral","Squeeze your abs","Squeeze your glutes","Keep breathing!"],
      alts:A([{en:"Knee Plank",zh:"跪姿平板",why_en:"Easier entry point",why_zh:"初学者入门版"},{en:"Side Plank",zh:"侧平板",why_en:"Targets obliques",why_zh:"针对腹斜肌"},{en:"Hollow Body Hold",zh:"空心收腹",why_en:"Deep core activation",why_zh:"激活深层核心"}]) },
    { id:"c2", emoji:"🔄", en:"Dead Bug", zh:"死虫式", muscle_en:"Deep Core", muscle_zh:"深层核心", sets:3, reps:10, rest:45, douyinUrl:"https://www.douyin.com",
      tip_en:"Press lower back to floor, extend opposite arm and leg, breathe out.", tip_zh:"下背贴地，伸展对侧手脚，呼气配合动作。",
      videoUrl:"",
      cues:["Back flat to floor","Opposite arm & leg","Breathe out","Move slowly"],
      alts:A([{en:"Bird Dog",zh:"鸟狗式",why_en:"On hands & knees, easier",why_zh:"四点撑地更容易"},{en:"Ab Wheel Rollout",zh:"健腹轮",why_en:"Advanced core challenge",why_zh:"进阶核心挑战"},{en:"Bicycle Crunch",zh:"自行车卷腹",why_en:"Dynamic option",why_zh:"更动态的核心训练"}]) },
  ],
  fullbody: [
    { id:"f1", emoji:"🌟", en:"Burpee", zh:"波比跳", muscle_en:"Full Body", muscle_zh:"全身", sets:3, reps:10, rest:60, douyinUrl:"https://www.douyin.com",
      tip_en:"Jump, drop to push-up, chest to floor, jump feet in, explode up.", tip_zh:"跳跃，落地做俯卧撑，胸部贴地，收腿，向上跳起。",
      videoUrl:"",
      cues:["Jump up first","Drop fast","Chest to floor","Explode back up"],
      alts:A([{en:"Half Burpee",zh:"半程波比",why_en:"No jump, lower impact",why_zh:"去掉跳跃降低冲击"},{en:"Mountain Climber",zh:"登山者",why_en:"Same cardio without jump",why_zh:"同样有氧不需跳跃"},{en:"Sprawl",zh:"跳扑",why_en:"MMA-style variation",why_zh:"格斗风格变式"}]) },
    { id:"f2", emoji:"🏋️", en:"Squat to Press", zh:"深蹲推举", muscle_en:"Legs / Shoulders / Core", muscle_zh:"腿部 / 肩部 / 核心", sets:3, reps:12, rest:75, douyinUrl:"https://www.douyin.com",
      tip_en:"Squat deep, drive up, use the momentum to press overhead.", tip_zh:"蹲到底部，向上爆发，借力推举至头顶。",
      videoUrl:"",
      cues:["Squat deep","Drive up strong","Use the momentum","Lock out overhead"],
      alts:A([{en:"Dumbbell Thruster",zh:"哑铃推举蹲",why_en:"Classic CrossFit combo",why_zh:"经典CrossFit动作"},{en:"KB Clean & Press",zh:"壶铃上挺推举",why_en:"More explosive",why_zh:"更具爆发性"},{en:"Squat + Shoulder Tap",zh:"深蹲+肩部点击",why_en:"No weights needed",why_zh:"无需任何器械"}]) },
    { id:"f3", emoji:"🔁", en:"Renegade Row", zh:"俯撑哑铃划船", muscle_en:"Back / Core / Chest", muscle_zh:"背部 / 核心 / 胸部", sets:3, reps:8, rest:75, douyinUrl:"https://www.douyin.com",
      tip_en:"Push-up position, row one arm, keep hips perfectly square.", tip_zh:"双手握哑铃撑地，单臂划船，保持髋部水平不偏转。",
      videoUrl:"",
      cues:["Hips perfectly square","Row one arm","Don't rotate hips","Control the weight"],
      alts:A([{en:"Plank Row (light)",zh:"平板支撑划船",why_en:"Lighter load version",why_zh:"减轻负重版本"},{en:"Superman Hold",zh:"超人伸展",why_en:"No equipment, back focus",why_zh:"无需器械专注背部"},{en:"T Push-Up",zh:"T字俯卧撑",why_en:"Bodyweight rotation",why_zh:"自重版旋转训练"}]) },
    { id:"f4", emoji:"🦘", en:"Jump Squat", zh:"跳跃深蹲", muscle_en:"Quads / Glutes / Calves", muscle_zh:"股四头肌 / 臀部 / 小腿", sets:3, reps:15, rest:60, douyinUrl:"https://www.douyin.com",
      tip_en:"Squat to parallel, explode up, land softly with bent knees.", tip_zh:"蹲至平行，爆发跳起，软落地膝盖弯曲缓冲。",
      videoUrl:"",
      cues:["Squat to parallel","Explode up!","Arms swing up","Soft landing"],
      alts:A([{en:"Box Jump",zh:"跳箱",why_en:"More controlled jump",why_zh:"更受控的跳跃"},{en:"Pulse Squat",zh:"脉冲深蹲",why_en:"Low-impact alternative",why_zh:"低冲击替代"},{en:"Step-Up",zh:"台阶踏步",why_en:"No jumping needed",why_zh:"无需跳跃"}]) },
  ],
  cardio: [
    { id:"v1", emoji:"🏃", en:"High Knees", zh:"高抬腿", muscle_en:"Cardio / Core", muscle_zh:"有氧 / 核心", sets:3, reps:40, rest:30, isTime:true, douyinUrl:"https://www.douyin.com",
      tip_en:"Drive knees to hip height, pump arms, stay on the balls of your feet.", tip_zh:"膝盖抬至髋高，手臂配合摆动，用脚掌前端着地。",
      videoUrl:"",
      cues:["Knees to hip height","Pump your arms","Stay light on feet","Breathe rhythmically"],
      alts:A([{en:"Marching in Place",zh:"原地踏步",why_en:"Low-impact warm-up",why_zh:"低冲击热身版"},{en:"Jump Rope",zh:"跳绳",why_en:"Classic cardio tool",why_zh:"经典有氧工具"},{en:"Jumping Jacks",zh:"开合跳",why_en:"Full-body warm-up",why_zh:"全身热身动作"}]) },
    { id:"v2", emoji:"🌀", en:"Mountain Climber", zh:"登山者", muscle_en:"Core / Cardio", muscle_zh:"核心 / 有氧", sets:3, reps:30, rest:30, isTime:true, douyinUrl:"https://www.douyin.com",
      tip_en:"Plank position, drive knees to chest alternately, keep hips level.", tip_zh:"平板支撑位置，交替收膝至胸，保持髋部水平。",
      videoUrl:"",
      cues:["Plank position","Drive knees fast","Hips stay level","Don't bounce hips"],
      alts:A([{en:"Slow Mountain Climber",zh:"慢速登山者",why_en:"Core focus, less cardio",why_zh:"更注重核心"},{en:"Cross-body Climber",zh:"交叉登山者",why_en:"Adds oblique work",why_zh:"增加腹斜肌参与"},{en:"Bear Crawl",zh:"熊爬",why_en:"More controlled",why_zh:"更受控的动作"}]) },
    { id:"v3", emoji:"⚡", en:"Box Jump", zh:"跳箱", muscle_en:"Power / Cardio", muscle_zh:"爆发力 / 有氧", sets:4, reps:8, rest:60, douyinUrl:"https://www.douyin.com",
      tip_en:"Hinge, load the legs, jump with arms overhead, land softly.", tip_zh:"髋部屈曲蓄力，双手上举跳起，软落地。",
      videoUrl:"",
      cues:["Load the hips","Arms swing up","Land softly","Step back down"],
      alts:A([{en:"Step-Up",zh:"台阶踏步",why_en:"No jump needed",why_zh:"无需跳跃"},{en:"Jump Squat",zh:"跳跃深蹲",why_en:"No box needed",why_zh:"不需要跳箱"},{en:"Broad Jump",zh:"立定跳远",why_en:"Horizontal power",why_zh:"水平爆发力"}]) },
    { id:"v4", emoji:"🏃", en:"Sprint Intervals", zh:"冲刺间歇", muscle_en:"Full Body Cardio", muscle_zh:"全身有氧", sets:6, reps:20, rest:40, isTime:true, douyinUrl:"https://www.douyin.com",
      tip_en:"20 seconds all-out effort, then rest. Push hard each sprint.", tip_zh:"全力冲刺20秒，然后休息。每次都要全力以赴。",
      videoUrl:"",
      cues:["Go all out!","Pump your arms","Drive your knees","Recover fully"],
      alts:A([{en:"Cycling Sprint",zh:"单车冲刺",why_en:"Low-impact HIIT",why_zh:"低冲击HIIT选项"},{en:"Rowing Intervals",zh:"划船机间歇",why_en:"Upper + lower body",why_zh:"上下肢同时参与"},{en:"Jump Rope Sprints",zh:"跳绳冲刺",why_en:"Minimal equipment HIIT",why_zh:"最少器械HIIT"}]) },
  ],
};

const WEEKLY_PLAN = [
  { day:"Mon", zh:"周一", type:"pull",      label:"Pull Day",  emoji:"🔄", color:"#FFF3E0" },
  { day:"Tue", zh:"周二", type:"legs",      label:"Leg Day",   emoji:"🦵", color:"#E8F6F7" },
  { day:"Wed", zh:"周三", type:"cardio",    label:"Cardio",    emoji:"🏃", color:"#FDEBD0" },
  { day:"Thu", zh:"周四", type:"push",      label:"Push Day",  emoji:"🫸", color:"#FEE8D6" },
  { day:"Fri", zh:"周五", type:"pull",      label:"Pull Day",  emoji:"🔄", color:"#FFF3E0" },
  { day:"Sat", zh:"周六", type:"fullbody",  label:"Full Body", emoji:"🌟", color:"#E0F4F5" },
  { day:"Sun", zh:"周日", type:"legs+core", label:"Legs+Core", emoji:"🏔️", color:"#E6F4F4" },
];

const FOOD_DB = [
  { name_en:"Chicken Breast 100g", name_zh:"鸡胸肉 100g", kcal:165, protein:31 },
  { name_en:"Brown Rice 100g", name_zh:"糙米 100g", kcal:216, protein:5 },
  { name_en:"Egg (1 whole)", name_zh:"鸡蛋 1个", kcal:78, protein:6 },
  { name_en:"Oats 50g", name_zh:"燕麦片 50g", kcal:188, protein:6.5 },
  { name_en:"Banana (medium)", name_zh:"香蕉 中等", kcal:89, protein:1.1 },
  { name_en:"Greek Yogurt 150g", name_zh:"希腊酸奶 150g", kcal:130, protein:15 },
  { name_en:"Salmon 100g", name_zh:"三文鱼 100g", kcal:208, protein:20 },
  { name_en:"Broccoli 100g", name_zh:"西兰花 100g", kcal:34, protein:2.8 },
  { name_en:"Sweet Potato 100g", name_zh:"红薯 100g", kcal:86, protein:1.6 },
  { name_en:"Almonds 30g", name_zh:"杏仁 30g", kcal:173, protein:6 },
  { name_en:"Protein Shake 1 scoop", name_zh:"蛋白粉 1勺", kcal:120, protein:25 },
  { name_en:"Tofu 100g", name_zh:"豆腐 100g", kcal:76, protein:8 },
  { name_en:"Avocado 100g", name_zh:"牛油果 100g", kcal:160, protein:2 },
  { name_en:"Milk 250ml", name_zh:"牛奶 250ml", kcal:122, protein:8 },
];

const DOUYIN_SCHEDULE = [
  { day:"Mon", zh:"周一", title:"Pull Day: Deadlift Form 硬拉姿势精讲", status:"recorded", emoji:"🎬" },
  { day:"Wed", zh:"周三", title:"5 Back Exercises You Need 背部5个必练动作", status:"planned", emoji:"📝" },
  { day:"Fri", zh:"周五", title:"Pull Day Vocab 拉力日健身英语词汇", status:"planned", emoji:"📝" },
  { day:"Sat", zh:"周六", title:"Leg Day Motivation 腿日 我为什么不想练", status:"idea", emoji:"💡" },
];

const TABS = [
  { id:"plan", icon:"📅", en:"Plan", zh:"计划" },
  { id:"workout", icon:"🔥", en:"Workout", zh:"跟练" },
  { id:"diet", icon:"🥗", en:"Diet", zh:"饮食" },
  { id:"vocab", icon:"💡", en:"Vocab", zh:"词汇" },
  { id:"share", icon:"📸", en:"Share", zh:"分享" },
];

const S = {
  card: { background:"#fff", borderRadius:20, padding:"16px 18px", boxShadow:"0 2px 16px rgba(0,0,0,0.06)", border:"1.5px solid #f0f0f0", marginBottom:12 },
  btn: (bg, color, full) => ({ background:bg, color, border:"none", borderRadius:14, padding:full?"14px":"10px 18px", cursor:"pointer", fontWeight:700, fontSize:14, fontFamily:"sans-serif", width:full?"100%":"auto" }),
};

// ── SWAP MODAL ────────────────────────────────────────────────────────────────
function SwapModal({ exercise, onSelect, onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:9999, display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:"24px 24px 0 0", padding:"24px 20px 44px", width:"100%", maxWidth:440 }}>
        <div style={{ width:36, height:4, background:"#e0e0e0", borderRadius:2, margin:"0 auto 18px" }} />
        <div style={{ fontSize:16, fontWeight:800, fontFamily:"Georgia,serif", color:"#1a1a2e", marginBottom:4 }}>Swap Exercise 换一个</div>
        <div style={{ fontSize:12, color:"#aaa", fontFamily:"sans-serif", marginBottom:16 }}>
          替换 <strong style={{ color:"#FD9033" }}>{exercise.en}</strong> · 无器械 / 初学者友好
        </div>
        {(exercise.alts||[]).map((alt, i) => (
          <div key={i} onClick={() => onSelect(alt)} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", borderRadius:14, marginBottom:8, cursor:"pointer", background:"#f8f8fc", border:"1.5px solid #f0f0f0" }}>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:14, color:"#1a1a2e", fontFamily:"Georgia,serif" }}>{alt.en}</div>
              <div style={{ fontSize:12, color:"#888", fontFamily:"sans-serif" }}>{alt.zh}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:11, color:"#FD9033", fontFamily:"sans-serif" }}>{alt.why_en}</div>
              <div style={{ fontSize:10, color:"#bbb", fontFamily:"sans-serif" }}>{alt.why_zh}</div>
            </div>
          </div>
        ))}
        <button onClick={onClose} style={{ ...S.btn("#f5f5f5","#888",true), marginTop:8, fontSize:13 }}>Keep Original · 保留原动作</button>
      </div>
    </div>
  );
}

function PlanTab({ onStartWorkout }) {
  const todayIdx = [6,0,1,2,3,4,5][new Date().getDay()];
  const [sel, setSel] = useState(todayIdx);
  const [editing, setEditing] = useState(false);

  const WORKOUT_TYPES = [
    { type:"pull",      label:"Pull Day",  zh:"拉力日",  emoji:"🔄", color:"#FFF3E0" },
    { type:"push",      label:"Push Day",  zh:"推力日",  emoji:"🫸", color:"#FEE8D6" },
    { type:"legs",      label:"Leg Day",   zh:"腿日",    emoji:"🦵", color:"#E8F6F7" },
    { type:"core",      label:"Core",      zh:"核心",    emoji:"🧘", color:"#E6F4F4" },
    { type:"fullbody",  label:"Full Body", zh:"全身",    emoji:"🌟", color:"#f3e8fd" },
    { type:"cardio",    label:"Cardio",    zh:"有氧",    emoji:"🏃", color:"#fff9e6" },
    { type:"legs+core", label:"Legs+Core", zh:"腿+核心", emoji:"🏔️", color:"#e0f4f5" },
    { type:"rest",      label:"Rest",      zh:"休息日",  emoji:"☀️", color:"#f8f8fc" },
  ];

  const [dayTypes, setDayTypes] = useState(() => {
    try { const s = localStorage.getItem("liftlingo_plan"); if (s) return JSON.parse(s); } catch {}
    return { 0:"pull", 1:"legs", 2:"cardio", 3:"push", 4:"pull", 5:"fullbody", 6:"legs+core" };
  });

  const saveDayType = (dayIdx, type) => {
    const next = { ...dayTypes, [dayIdx]: type };
    setDayTypes(next);
    try { localStorage.setItem("liftlingo_plan", JSON.stringify(next)); } catch {}
    setEditing(false);
  };

  const currentType = dayTypes[sel] || "rest";
  const currentWT = WORKOUT_TYPES.find(w => w.type === currentType) || WORKOUT_TYPES[7];

  const getExercises = (type) => {
    if (type === "rest") return [];
    if (type === "legs+core") return [...(EXERCISE_DB.legs||[]), ...(EXERCISE_DB.core||[])];
    return EXERCISE_DB[type] || [];
  };
  const exercises = getExercises(currentType);

  const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const DAYS_ZH = ["周一","周二","周三","周四","周五","周六","周日"];

  return (
    <div>
      {/* 日期条 */}
      <div style={{ display:"flex", gap:6, overflowX:"auto", padding:"4px 0 14px", scrollbarWidth:"none" }}>
        {DAYS.map((d, i) => {
          const t = WORKOUT_TYPES.find(w => w.type === (dayTypes[i]||"rest")) || WORKOUT_TYPES[7];
          return (
            <button key={i} onClick={() => { setSel(i); setEditing(false); }} style={{
              minWidth:54, padding:"10px 0", borderRadius:14, border:"none",
              background: i===sel ? "#1a1a2e" : t.color,
              color: i===sel ? "#fff" : "#333",
              cursor:"pointer", fontFamily:"sans-serif", transition:"all 0.2s",
              boxShadow: i===sel ? "0 4px 14px rgba(26,26,46,0.3)" : "none",
              position:"relative", flexShrink:0,
            }}>
              {i===todayIdx && <span style={{ position:"absolute", top:5, right:7, width:6, height:6, borderRadius:"50%", background:"#FF6B6B", display:"block" }} />}
              <div style={{ fontSize:12, fontWeight:700 }}>{d}</div>
              <div style={{ fontSize:10, marginTop:2, opacity:0.8 }}>{DAYS_ZH[i]}</div>
              <div style={{ fontSize:12, marginTop:1 }}>{t.emoji}</div>
            </button>
          );
        })}
      </div>

      {/* 训练类型选择器（编辑模式）*/}
      {editing ? (
        <div style={{ ...S.card }}>
          <div style={{ fontSize:16, fontWeight:900, color:"#1a1a2e", fontFamily:"sans-serif", marginBottom:2 }}>
            {DAYS_ZH[sel]} · 练什么？
          </div>
          <div style={{ fontSize:12, color:"#aaa", fontFamily:"sans-serif", marginBottom:14 }}>选一个训练类型，下次打开自动记住</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {WORKOUT_TYPES.map((w) => (
              <div key={w.type} onClick={() => saveDayType(sel, w.type)} style={{
                padding:"14px 12px", borderRadius:14, cursor:"pointer", textAlign:"center",
                background: currentType===w.type ? "#1a1a2e" : w.color,
                border: currentType===w.type ? "2px solid #1a1a2e" : "2px solid transparent",
                transition:"all 0.15s",
              }}>
                <div style={{ fontSize:24 }}>{w.emoji}</div>
                <div style={{ fontSize:14, fontWeight:800, color: currentType===w.type ? "#fff" : "#1a1a2e", fontFamily:"sans-serif", marginTop:4 }}>{w.zh}</div>
                <div style={{ fontSize:10, color: currentType===w.type ? "#FECB8A" : "#aaa", fontFamily:"sans-serif" }}>{w.label}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setEditing(false)} style={{ ...S.btn("#f5f5f5","#888",true), marginTop:12, fontSize:13 }}>取消</button>
        </div>
      ) : (
        <div style={{ ...S.card }}>
          {/* 标题行 */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:24 }}>{currentWT.emoji}</span>
                <div>
                  <div style={{ fontSize:20, fontWeight:900, color:"#1a1a2e", fontFamily:"sans-serif" }}>{currentWT.zh}</div>
                  <div style={{ fontSize:12, color:"#FD9033", fontFamily:"Georgia,serif", fontWeight:700 }}>{currentWT.label}</div>
                </div>
              </div>
              {exercises.length > 0 && (
                <div style={{ fontSize:11, color:"#bbb", marginTop:6, fontFamily:"sans-serif" }}>
                  {exercises.length} 个动作 · 共 {exercises.reduce((s,e)=>s+e.sets,0)} 组
                </div>
              )}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6, alignItems:"flex-end" }}>
              <button onClick={() => setEditing(true)} style={{ ...S.btn("#f8f8fc","#FD9033"), fontSize:11, padding:"6px 12px" }}>
                ✏️ 换训练
              </button>
              {exercises.length > 0 && (
                <button onClick={() => onStartWorkout(exercises)} style={{ ...S.btn("#1a1a2e","#fff"), fontSize:12 }}>
                  开始 ▶
                </button>
              )}
            </div>
          </div>

          {/* 动作列表 / 休息日 */}
          {exercises.length === 0 ? (
            <div style={{ textAlign:"center", padding:"24px 0" }}>
              <div style={{ fontSize:40 }}>☀️</div>
              <div style={{ marginTop:8, fontSize:16, fontWeight:700, color:"#333", fontFamily:"sans-serif" }}>休息日</div>
              <div style={{ fontSize:12, color:"#bbb", marginTop:4, fontFamily:"sans-serif" }}>Rest day · 恢复也是训练的一部分</div>
              <button onClick={() => setEditing(true)} style={{ ...S.btn("#FFF3E0","#C95F00"), marginTop:14, fontSize:12 }}>
                今天想练？换个训练 →
              </button>
            </div>
          ) : (
            <>
              {exercises.map(ex => (
                <div key={ex.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid #f5f5f5" }}>
                  <span style={{ fontSize:26, width:34, textAlign:"center" }}>{ex.emoji}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800, fontSize:14, color:"#1a1a2e", fontFamily:"sans-serif" }}>{ex.zh}</div>
                    <div style={{ fontSize:11, color:"#FD9033", fontFamily:"Georgia,serif" }}>{ex.en}</div>
                    <div style={{ fontSize:10, color:"#bbb", fontFamily:"sans-serif" }}>{ex.muscle_zh}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontFamily:"monospace", fontSize:14, color:"#FD9033", fontWeight:800 }}>
                      {ex.sets}×{ex.isTime ? `${ex.reps}s` : ex.reps}
                    </div>
                    <div style={{ fontSize:10, color:"#ddd" }}>{ex.rest}s 休息</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:12, padding:"10px 14px", background:"#f8f8fc", borderRadius:12, display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:16 }}>💡</span>
                <div style={{ fontSize:11, color:"#888", fontFamily:"sans-serif" }}>
                  跟练时点 <strong>「换一个」</strong> 可替换为无器械替代动作
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function WorkoutTab({ exercises: initExercises }) {
  const baseExercises = (initExercises && initExercises.length > 0) ? initExercises : EXERCISE_DB.pull;
  const [exerciseList, setExerciseList] = useState(baseExercises);
  const [swapTarget, setSwapTarget] = useState(null);
  const [phase, setPhase] = useState("preview");
  const [exIdx, setExIdx] = useState(0);
  const [setIdx, setSetIdx] = useState(0);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [customSets, setCustomSets] = useState({});
  const [customReps, setCustomReps] = useState({});
  const [expanded, setExpanded] = useState(null);
  const intervalRef = useRef(null);

  const getSets = useCallback((ex) => customSets[ex.id] ?? ex.sets, [customSets]);
  const getReps = useCallback((ex) => customReps[ex.id] ?? ex.reps, [customReps]);

  const advanceSet = useCallback(() => {
    const ex = exerciseList[exIdx];
    const totalSets = getSets(ex);
    if (setIdx + 1 < totalSets) {
      setSetIdx(s => s + 1);
      setPhase("active");
    } else if (exIdx + 1 < exerciseList.length) {
      setExIdx(i => i + 1);
      setSetIdx(0);
      setPhase("active");
    } else {
      setPhase("done");
    }
  }, [exIdx, setIdx, exerciseList, getSets]);

  useEffect(() => {
    if (running && timer > 0) {
      intervalRef.current = setTimeout(() => setTimer(t => t - 1), 1000);
    } else if (running && timer === 0) {
      setRunning(false);
      if (phase === "rest") advanceSet();
    }
    return () => clearTimeout(intervalRef.current);
  }, [running, timer, phase, advanceSet]);

  const finishSet = () => {
    const ex = exerciseList[exIdx];
    setPhase("rest");
    setTimer(ex.rest);
    setRunning(true);
  };

  const skipRest = () => { setRunning(false); advanceSet(); };
  const reset = () => { setPhase("preview"); setExIdx(0); setSetIdx(0); setRunning(false); setExerciseList(baseExercises); setCustomSets({}); setCustomReps({}); };

  const handleSwap = (alt) => {
    setExerciseList(prev => prev.map(ex =>
      ex.id === swapTarget.id ? { ...ex, en: alt.en, zh: alt.zh } : ex
    ));
    setSwapTarget(null);
  };

  if (phase === "preview") return (
    <div>
      {swapTarget && <SwapModal exercise={swapTarget} onSelect={handleSwap} onClose={() => setSwapTarget(null)} />}
      <div style={{ fontSize:12, color:"#888", fontFamily:"sans-serif", marginBottom:10 }}>
        Tap an exercise to customize · 点击展开 · 「换一个」替换动作
      </div>
      {exerciseList.map(ex => (
        <div key={ex.id} style={{ ...S.card, marginBottom:8, padding:"14px 16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={() => setExpanded(expanded===ex.id?null:ex.id)}>
            <span style={{ fontSize:26 }}>{ex.emoji}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:800, fontSize:15, fontFamily:"sans-serif", color:"#1a1a2e" }}>{ex.zh} <span style={{ color:"#FD9033", fontWeight:600, fontSize:12, fontFamily:"Georgia,serif" }}>{ex.en}</span></div>
              <div style={{ fontSize:11, color:"#aaa", fontFamily:"sans-serif" }}>{ex.muscle_zh}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:14, fontWeight:700, color:"#FD9033", fontFamily:"monospace" }}>{getSets(ex)}×{ex.isTime?`${getReps(ex)}s`:getReps(ex)}</div>
              <div style={{ fontSize:10, color:"#ccc" }}>{expanded===ex.id?"▲":"▼"}</div>
            </div>
          </div>
          {expanded === ex.id && (
            <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid #f5f5f5" }}>
              <div style={{ display:"flex", gap:16, marginBottom:12 }}>
                {[["Sets 组数", getSets, setCustomSets, 1], [ex.isTime?"Seconds 秒":"Reps 次数", getReps, setCustomReps, 1]].map(([label, getter, setter, min], idx) => (
                  <div key={idx} style={{ flex:1 }}>
                    <div style={{ fontSize:11, color:"#999", marginBottom:6, fontFamily:"sans-serif" }}>{label}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <button onClick={(e)=>{e.stopPropagation();setter(p=>({...p,[ex.id]:Math.max(min,getter(ex)-1)}))}} style={{ width:30,height:30,borderRadius:"50%",border:"1.5px solid #ddd",background:"#fff",fontSize:16,cursor:"pointer" }}>−</button>
                      <span style={{ fontSize:18, fontWeight:800, width:28, textAlign:"center", fontFamily:"monospace" }}>{getter(ex)}</span>
                      <button onClick={(e)=>{e.stopPropagation();setter(p=>({...p,[ex.id]:getter(ex)+1}))}} style={{ width:30,height:30,borderRadius:"50%",border:"1.5px solid #ddd",background:"#fff",fontSize:16,cursor:"pointer" }}>+</button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize:12, color:"#555", fontFamily:"sans-serif", lineHeight:1.7, background:"#f8f8fc", borderRadius:10, padding:"10px 12px", marginBottom:10 }}>
                <strong>🎯</strong> {ex.tip_en}<br/>
                <span style={{ color:"#aaa" }}>✅ {ex.tip_zh}</span>
              </div>

              {/* Inline Video Player */}
              <div style={{ borderRadius:12, overflow:"hidden", background:"#1a1a2e", marginBottom:10 }}>
                {ex.videoUrl ? (
                  <video src={ex.videoUrl} controls playsInline style={{ width:"100%", display:"block", maxHeight:200, objectFit:"cover" }} />
                ) : (
                  <div style={{ height:120, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6 }}>
                    <div style={{ fontSize:34 }}>{ex.emoji}</div>
                    <div style={{ fontSize:14, fontWeight:800, color:"#fff", fontFamily:"sans-serif" }}>{ex.zh}</div>
                    <div style={{ fontSize:11, color:"#FD9033", fontFamily:"Georgia,serif" }}>{ex.en}</div>
                    <div style={{ fontSize:10, color:"#F4A84A", fontFamily:"sans-serif", letterSpacing:0.8 }}>示范视频即将上线 · Coming Soon</div>
                  </div>
                )}
              </div>

              {ex.alts && ex.alts.length > 0 && (
                <button onClick={(e)=>{e.stopPropagation();setSwapTarget(ex);}} style={{ ...S.btn("#FFF3E0","#C95F00",true), fontSize:12, borderRadius:10 }}>🔄 换一个动作</button>
              )}
            </div>
          )}
        </div>
      ))}
      <button onClick={() => setPhase("active")} style={{ ...S.btn("#1a1a2e","#fff",true), marginTop:4 }}>
        🔥 Start Workout · 开始跟练
      </button>
    </div>
  );

  if (phase === "done") {
    const totalSets = exerciseList.reduce((s,e)=>s+getSets(e),0);
    return (
      <div style={{ textAlign:"center", padding:"40px 20px" }}>
        <div style={{ fontSize:64 }}>🎉</div>
        <div style={{ fontSize:26, fontWeight:800, fontFamily:"Georgia,serif", color:"#1a1a2e", marginTop:16 }}>Workout Complete!</div>
        <div style={{ fontSize:15, color:"#888", marginTop:6, fontFamily:"sans-serif" }}>太厉害了！今天完成 {totalSets} 组训练</div>
        <div style={{ display:"flex", gap:12, justifyContent:"center", marginTop:24 }}>
          <div style={{ background:"#E6F4F4", borderRadius:16, padding:"16px 24px", textAlign:"center" }}>
            <div style={{ fontSize:26, fontWeight:800, color:"#388e3c", fontFamily:"Georgia,serif" }}>{exerciseList.length}</div>
            <div style={{ fontSize:11, color:"#888", fontFamily:"sans-serif" }}>Exercises 动作</div>
          </div>
          <div style={{ background:"#e3f2fd", borderRadius:16, padding:"16px 24px", textAlign:"center" }}>
            <div style={{ fontSize:26, fontWeight:800, color:"#1565c0", fontFamily:"Georgia,serif" }}>{totalSets}</div>
            <div style={{ fontSize:11, color:"#888", fontFamily:"sans-serif" }}>Total Sets 总组数</div>
          </div>
        </div>
        <button onClick={reset} style={{ ...S.btn("#1a1a2e","#fff",true), marginTop:24 }}>Reset · 重新开始</button>
      </div>
    );
  }

  if (phase === "rest") return (
    <div style={{ textAlign:"center", padding:"24px 0" }}>
      <div style={{ fontSize:13, color:"#888", fontFamily:"sans-serif", letterSpacing:2, marginBottom:8 }}>REST TIME · 休息中</div>
      <div style={{ fontSize:88, fontWeight:900, fontFamily:"Georgia,serif", color: timer <= 10 ? "#e53935" : "#1a1a2e", transition:"color 0.5s", lineHeight:1 }}>{timer}</div>
      <div style={{ fontSize:14, color:"#aaa", fontFamily:"sans-serif", marginBottom:20 }}>seconds · 秒</div>
      <div style={{ background:"#f8f8fc", borderRadius:14, padding:"14px", marginBottom:16 }}>
        <div style={{ fontSize:12, color:"#888", fontFamily:"sans-serif" }}>下一个动作 · Next up</div>
        <div style={{ fontSize:18, fontWeight:800, color:"#1a1a2e", fontFamily:"sans-serif", marginTop:4 }}>{exerciseList[exIdx]?.zh}</div>
        <div style={{ fontSize:12, color:"#FD9033", fontFamily:"Georgia,serif" }}>{exerciseList[exIdx]?.en} · 第 {setIdx+1}/{getSets(exerciseList[exIdx])} 组</div>
      </div>
      <button onClick={skipRest} style={{ ...S.btn("#f0f0f7","#555") }}>Skip Rest · 跳过休息</button>
    </div>
  );

  const ex = exerciseList[exIdx];
  const progress = (exIdx / exerciseList.length) * 100;
  return (
    <div>
      {swapTarget && <SwapModal exercise={swapTarget} onSelect={handleSwap} onClose={() => setSwapTarget(null)} />}

      {/* 进度条 + 计数 */}
      <div style={{ background:"#f0f0f0", borderRadius:8, height:6, marginBottom:8, overflow:"hidden" }}>
        <div style={{ width:`${progress}%`, height:"100%", background:"linear-gradient(90deg,#FD9033,#62B1B8)", borderRadius:8, transition:"width 0.5s" }} />
      </div>
      <div style={{ fontSize:11, color:"#aaa", fontFamily:"sans-serif", marginBottom:10, textAlign:"center" }}>
        第 {exIdx+1} / {exerciseList.length} 个动作 · 第 {setIdx+1} / {getSets(ex)} 组
      </div>

      {/* 主卡片：视频打头 */}
      <div style={{ background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.08)", border:"1.5px solid #f0f0f0", marginBottom:12, position:"relative" }}>

        {/* 换一个按钮浮层 */}
        {ex.alts && ex.alts.length > 0 && (
          <button onClick={() => setSwapTarget(ex)} style={{ position:"absolute", top:12, right:12, zIndex:2, background:"rgba(255,255,255,0.92)", color:"#C95F00", border:"none", borderRadius:20, padding:"5px 12px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"sans-serif", boxShadow:"0 2px 8px rgba(0,0,0,0.15)" }}>
            🔄 换一个
          </button>
        )}

        {/* ① 视频 — 最顶部 */}
        <div style={{ background:"#1a1a2e", width:"100%" }}>
          {ex.videoUrl ? (
            <video src={ex.videoUrl} controls playsInline style={{ width:"100%", display:"block", maxHeight:210, objectFit:"cover" }} />
          ) : (
            <div style={{ height:170, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8 }}>
              <div style={{ fontSize:48 }}>{ex.emoji}</div>
              <div style={{ fontSize:16, fontWeight:800, color:"#fff", fontFamily:"sans-serif" }}>{ex.zh}</div>
              <div style={{ fontSize:11, color:"#FD9033", fontFamily:"Georgia,serif" }}>{ex.en}</div>
              <div style={{ fontSize:10, color:"#F4A84A", fontFamily:"sans-serif", marginTop:2 }}>示范视频即将上线 · Coming Soon</div>
            </div>
          )}
        </div>

        <div style={{ padding:"16px 18px 18px", textAlign:"center" }}>
          {/* ② 动作名 */}
          <div style={{ fontSize:26, fontWeight:900, color:"#1a1a2e", fontFamily:"sans-serif" }}>{ex.zh}</div>
          <div style={{ fontSize:13, color:"#FD9033", fontWeight:700, fontFamily:"Georgia,serif", marginTop:2 }}>{ex.en}</div>
          <div style={{ fontSize:11, color:"#ccc", marginTop:2, fontFamily:"sans-serif" }}>{ex.muscle_zh} · {ex.muscle_en}</div>

          {/* ③ 组数/次数 */}
          <div style={{ display:"flex", gap:10, justifyContent:"center", marginTop:14 }}>
            <div style={{ background:"#FFF3E0", borderRadius:14, padding:"10px 28px", textAlign:"center" }}>
              <div style={{ fontSize:30, fontWeight:900, color:"#FD9033", fontFamily:"Georgia,serif", lineHeight:1 }}>{getReps(ex)}{ex.isTime?"s":""}</div>
              <div style={{ fontSize:13, color:"#1a1a2e", fontWeight:700, fontFamily:"sans-serif", marginTop:2 }}>{ex.isTime?"秒":"次"}</div>
              <div style={{ fontSize:9, color:"#FECB8A", fontFamily:"sans-serif" }}>{ex.isTime?"Seconds":"Reps"}</div>
            </div>
            <div style={{ background:"#E8F6F7", borderRadius:14, padding:"10px 28px", textAlign:"center" }}>
              <div style={{ fontSize:30, fontWeight:900, color:"#62B1B8", fontFamily:"Georgia,serif", lineHeight:1 }}>{setIdx+1}<span style={{ fontSize:16, color:"#A8D8DC" }}>/{getSets(ex)}</span></div>
              <div style={{ fontSize:13, color:"#1a1a2e", fontWeight:700, fontFamily:"sans-serif", marginTop:2 }}>组</div>
              <div style={{ fontSize:9, color:"#A8D8DC", fontFamily:"sans-serif" }}>Set</div>
            </div>
          </div>

          {/* ④ Coaching Cues */}
          <div style={{ marginTop:14, background:"#f8f8fc", borderRadius:12, padding:"11px 14px", textAlign:"left" }}>
            <div style={{ fontSize:10, color:"#bbb", fontFamily:"sans-serif", marginBottom:5, letterSpacing:1 }}>动作要点 · COACHING CUES</div>
            {ex.cues.map((c,i) => (
              <div key={i} style={{ fontSize:13, color:"#444", padding:"2px 0", fontFamily:"sans-serif" }}>
                <span style={{ color:"#FD9033", marginRight:6, fontWeight:800 }}>{i+1}.</span>{c}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={finishSet} style={{ ...S.btn("#1a1a2e","#fff",true) }}>
        ✅ 完成这组 · Set Done
      </button>
    </div>
  );
}

function DietTab() {
  const [meals, setMeals] = useState({ breakfast:[], lunch:[], dinner:[], snack:[] });
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(null);
  const [customName, setCustomName] = useState("");
  const [customKcal, setCustomKcal] = useState("");
  const [customProtein, setCustomProtein] = useState("");
  const mealLabels = { breakfast:["Breakfast","早餐","🌅"], lunch:["Lunch","午餐","☀️"], dinner:["Dinner","晚餐","🌙"], snack:["Snack","加餐","🍎"] };
  const allFoods = Object.values(meals).flat();
  const totalKcal = allFoods.reduce((s,f)=>s+(f.kcal||0), 0);
  const totalProtein = allFoods.reduce((s,f)=>s+(f.protein||0), 0);
  const targetKcal = 1800;
  const filtered = query.length > 0 ? FOOD_DB.filter(f => f.name_en.toLowerCase().includes(query.toLowerCase()) || f.name_zh.includes(query)) : FOOD_DB;
  const addFood = (meal, food) => { setMeals(prev => ({ ...prev, [meal]: [...prev[meal], food] })); setAdding(null); setQuery(""); };
  const removeFood = (meal, idx) => setMeals(prev => ({ ...prev, [meal]: prev[meal].filter((_,i)=>i!==idx) }));
  const addCustom = (meal) => {
    if (!customName || !customKcal) return;
    addFood(meal, { name_en:customName, name_zh:customName, kcal:Number(customKcal), protein:Number(customProtein)||0 });
    setCustomName(""); setCustomKcal(""); setCustomProtein("");
  };
  return (
    <div>
      <div style={{ display:"flex", gap:10, marginBottom:14 }}>
        {[
          { label:"kcal",sublabel:"今日热量",val:totalKcal,bg:"#E6F4F4",color:"#388e3c" },
          { label:"g protein",sublabel:"蛋白质",val:`${Math.round(totalProtein)}g`,bg:"#e3f2fd",color:"#1565c0" },
          { label:"% goal",sublabel:"目标达成",val:`${Math.round(Math.min(totalKcal/targetKcal,1)*100)}%`,bg:"#E8F6F7",color:"#C95F00" },
        ].map((s,i) => (
          <div key={i} style={{ flex:1, background:s.bg, borderRadius:14, padding:"12px 8px", textAlign:"center" }}>
            <div style={{ fontSize:20, fontWeight:800, color:s.color, fontFamily:"Georgia,serif" }}>{s.val}</div>
            <div style={{ fontSize:9, color:"#888", fontFamily:"sans-serif" }}>{s.label}</div>
            <div style={{ fontSize:9, color:"#bbb", fontFamily:"sans-serif" }}>{s.sublabel}</div>
          </div>
        ))}
      </div>
      <div style={{ background:"#f0f0f0", borderRadius:8, height:6, marginBottom:16, overflow:"hidden" }}>
        <div style={{ width:`${Math.min(totalKcal/targetKcal*100,100)}%`, height:"100%", background:"linear-gradient(90deg,#FD9033,#42A5F5)", borderRadius:8, transition:"width 0.6s" }} />
      </div>
      {Object.entries(mealLabels).map(([meal, [en, zh, emoji]]) => (
        <div key={meal} style={{ ...S.card }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <div style={{ fontWeight:700, fontSize:15, fontFamily:"Georgia,serif", color:"#1a1a2e" }}>
              {emoji} {en} <span style={{ fontWeight:400, fontSize:12, color:"#aaa" }}>{zh}</span>
            </div>
            <button onClick={() => setAdding(adding===meal?null:meal)} style={{ ...S.btn(adding===meal?"#E8F6F7":"#f0f0f7", adding===meal?"#C95F00":"#FD9033"), fontSize:12, padding:"6px 14px" }}>
              {adding===meal ? "Cancel 取消" : "+ Add 添加"}
            </button>
          </div>
          {meals[meal].map((f,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 0", borderBottom:"1px solid #f8f8f8" }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, color:"#333", fontFamily:"sans-serif" }}>{f.name_en}</div>
                <div style={{ fontSize:11, color:"#aaa", fontFamily:"sans-serif" }}>{f.name_zh}</div>
              </div>
              <span style={{ fontSize:12, color:"#FD9033", fontWeight:700, fontFamily:"monospace" }}>{f.kcal} kcal</span>
              <span style={{ fontSize:11, color:"#81c784", fontFamily:"monospace" }}>{f.protein}g P</span>
              <button onClick={() => removeFood(meal,i)} style={{ background:"none", border:"none", color:"#ddd", cursor:"pointer", fontSize:18, padding:"0 4px", lineHeight:1 }}>×</button>
            </div>
          ))}
          {adding === meal && (
            <div style={{ marginTop:12, background:"#f8f8fc", borderRadius:12, padding:14 }}>
              <input placeholder="Search food / 搜索食物..." value={query} onChange={e => setQuery(e.target.value)} style={{ width:"100%", border:"1.5px solid #e0e0e0", borderRadius:10, padding:"10px 12px", fontSize:13, fontFamily:"sans-serif", boxSizing:"border-box", outline:"none" }} />
              <div style={{ maxHeight:160, overflowY:"auto", marginTop:8 }}>
                {filtered.map((f,i) => (
                  <div key={i} onClick={() => addFood(meal,f)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 4px", borderBottom:"1px solid #f0f0f0", cursor:"pointer" }}>
                    <div>
                      <div style={{ fontSize:13, color:"#333", fontFamily:"sans-serif" }}>{f.name_en}</div>
                      <div style={{ fontSize:11, color:"#aaa", fontFamily:"sans-serif" }}>{f.name_zh}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:12, color:"#FD9033", fontWeight:700 }}>{f.kcal} kcal</div>
                      <div style={{ fontSize:10, color:"#81c784" }}>{f.protein}g P</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop:"1px dashed #ddd", paddingTop:10, marginTop:8 }}>
                <div style={{ fontSize:11, color:"#aaa", marginBottom:8, fontFamily:"sans-serif" }}>Or enter manually · 或手动输入</div>
                <div style={{ display:"flex", gap:6 }}>
                  <input placeholder="Name 名称" value={customName} onChange={e=>setCustomName(e.target.value)} style={{ flex:2, border:"1.5px solid #e0e0e0", borderRadius:8, padding:"8px 10px", fontSize:12, fontFamily:"sans-serif", outline:"none" }} />
                  <input placeholder="kcal" value={customKcal} onChange={e=>setCustomKcal(e.target.value)} type="number" style={{ flex:1, border:"1.5px solid #e0e0e0", borderRadius:8, padding:"8px 10px", fontSize:12, fontFamily:"sans-serif", outline:"none" }} />
                  <input placeholder="P(g)" value={customProtein} onChange={e=>setCustomProtein(e.target.value)} type="number" style={{ flex:1, border:"1.5px solid #e0e0e0", borderRadius:8, padding:"8px 10px", fontSize:12, fontFamily:"sans-serif", outline:"none" }} />
                </div>
                <button onClick={() => addCustom(meal)} style={{ ...S.btn("#1a1a2e","#fff",true), marginTop:8 }}>Add 添加</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function VocabTab() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flipped, setFlipped] = useState({});
  const [phraseOfDay, setPhraseOfDay] = useState(null);
  const todayKey = new Date().toISOString().slice(0,10);

  const getLearnedWords = () => { try { return JSON.parse(localStorage.getItem("fwz_learned")||"[]"); } catch { return []; } };

  const generateVocab = async () => {
    setLoading(true); setFlipped({});
    const learned = getLearnedWords();
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          messages:[{ role:"user", content:`Generate 5 fitness/gym English vocabulary words for a Chinese beginner learning English.
Words to AVOID (already learned): ${learned.slice(-40).join(", ")||"none"}
Date: ${todayKey}
Return ONLY a valid JSON array, no markdown:
[{"en":"Word","zh":"中文","phonetic":"/fəˈnɛtɪk/","example_en":"Sentence using word.","example_zh":"中文例句。"}]` }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "[]";
      const parsed = JSON.parse(text.replace(/\`\`\`json|\`\`\`/g,"").trim());
      setWords(parsed);
      const newLearned = [...learned, ...parsed.map(w=>w.en)];
      localStorage.setItem("fwz_learned", JSON.stringify(newLearned));
    } catch {
      setWords([
        { en:"Progressive Overload", zh:"渐进超负荷", phonetic:"/prəˈɡrɛsɪv ˈoʊvərloʊd/", example_en:"Progressive overload is the key to muscle growth.", example_zh:"渐进超负荷是肌肉增长的关键。" },
        { en:"Rep", zh:"次数", phonetic:"/rɛp/", example_en:"Do 12 reps for each set.", example_zh:"每组做12次。" },
        { en:"Spotter", zh:"辅助保护员", phonetic:"/ˈspɒtər/", example_en:"Always use a spotter when lifting heavy.", example_zh:"举重时要找人保护。" },
        { en:"Compound Movement", zh:"复合动作", phonetic:"/ˈkɒmpaʊnd ˈmuːvmənt/", example_en:"Squats are a great compound movement.", example_zh:"深蹲是一个很好的复合动作。" },
        { en:"Cool-down", zh:"整理放松", phonetic:"/kuːl daʊn/", example_en:"Never skip the cool-down after training.", example_zh:"训练后永远不要跳过放松环节。" },
      ]);
    }
    setLoading(false);
  };

  const generatePhrase = async () => {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:200,
          messages:[{ role:"user", content:`Give one motivational fitness quote in English with Chinese translation. Return ONLY JSON: {"en":"quote","zh":"中文翻译","author":"Name"}` }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "{}";
      setPhraseOfDay(JSON.parse(text.replace(/\`\`\`json|\`\`\`/g,"").trim()));
    } catch {
      setPhraseOfDay({ en:"The only bad workout is the one that didn't happen.", zh:"唯一糟糕的训练，是那次没有发生的训练。", author:"Unknown" });
    }
  };

  useEffect(() => { generateVocab(); generatePhrase(); }, []);

  const learned = getLearnedWords();

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <div>
          <div style={{ fontSize:16, fontWeight:800, fontFamily:"Georgia,serif", color:"#1a1a2e" }}>Today's Words 今日词汇</div>
          <div style={{ fontSize:11, color:"#aaa", fontFamily:"sans-serif" }}>AI generated · 已学 {learned.length} 词 · {todayKey}</div>
        </div>
        <button onClick={generateVocab} disabled={loading} style={{ ...S.btn("#f0f0f7","#FD9033"), fontSize:12, padding:"8px 14px" }}>
          {loading ? "Generating..." : "🔄 New Batch"}
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign:"center", padding:"40px 0", color:"#aaa", fontFamily:"sans-serif" }}>
          <div style={{ fontSize:36, marginBottom:10 }}>✨</div>
          AI is generating today's words...<br/>正在为你生成今日词汇
        </div>
      ) : (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
            {words.map((w,i) => (
              <div key={i} onClick={() => setFlipped(p=>({...p,[i]:!p[i]}))} style={{
                borderRadius:18, padding:"18px 14px", textAlign:"center", cursor:"pointer",
                background: flipped[i] ? "#1a1a2e" : "#fff",
                border:"1.5px solid " + (flipped[i] ? "#1a1a2e" : "#f0f0f0"),
                boxShadow:"0 3px 14px rgba(0,0,0,0.07)", transition:"all 0.3s",
                minHeight:110, display:"flex", flexDirection:"column", justifyContent:"center",
              }}>
                {!flipped[i] ? (
                  <>
                    <div style={{ fontSize:13, fontWeight:800, color:"#1a1a2e", fontFamily:"Georgia,serif", lineHeight:1.3 }}>{w.en}</div>
                    <div style={{ fontSize:10, color:"#aaa", marginTop:6, fontFamily:"monospace" }}>{w.phonetic}</div>
                    <div style={{ fontSize:9, color:"#ddd", marginTop:8, fontFamily:"sans-serif" }}>tap to flip · 点击翻转</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize:18, fontWeight:800, color:"#fff" }}>{w.zh}</div>
                    <div style={{ fontSize:11, color:"#FECB8A", marginTop:6, fontFamily:"Georgia,serif" }}>{w.en}</div>
                    <div style={{ fontSize:10, color:"#666", marginTop:6, fontFamily:"sans-serif", lineHeight:1.5 }}>{w.example_zh}</div>
                  </>
                )}
              </div>
            ))}
          </div>
          {words.length > 0 && (
            <div style={{ ...S.card, marginBottom:12 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#FD9033", marginBottom:10, fontFamily:"sans-serif" }}>📚 Example Sentences 例句</div>
              {words.map((w,i) => (
                <div key={i} style={{ padding:"8px 0", borderBottom:"1px solid #f5f5f5" }}>
                  <div style={{ fontSize:12, color:"#333", fontFamily:"sans-serif", lineHeight:1.6 }}><span style={{ color:"#FD9033", fontWeight:700 }}>{w.en}:</span> {w.example_en}</div>
                  <div style={{ fontSize:11, color:"#aaa", fontFamily:"sans-serif", marginTop:2 }}>{w.example_zh}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {phraseOfDay && (
        <div style={{ background:"#1a1a2e", borderRadius:18, padding:"18px 20px", color:"#fff" }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:1, color:"#FECB8A", marginBottom:8, fontFamily:"sans-serif" }}>💬 PHRASE OF THE DAY 今日金句</div>
          <div style={{ fontSize:15, fontWeight:800, fontFamily:"Georgia,serif", lineHeight:1.6 }}>"{phraseOfDay.en}"</div>
          <div style={{ fontSize:12, color:"#c5cae9", marginTop:6, fontFamily:"sans-serif" }}>{phraseOfDay.zh}</div>
          {phraseOfDay.author && <div style={{ fontSize:10, color:"#F4A84A", marginTop:6 }}>— {phraseOfDay.author}</div>}
        </div>
      )}
    </div>
  );
}

function ShareTab() {
  const [checkin, setCheckin] = useState({ workout:false, diet:false, vocab:false });
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);
  const today = new Date();
  const dateStr = today.toLocaleDateString("zh-CN",{month:"long",day:"numeric",weekday:"short"});
  const todayKey = today.toISOString().slice(0,10);

  const generateCaption = () => {
    const parts = [];
    if (checkin.workout) parts.push("✅ 完成今日训练 Workout done!");
    if (checkin.diet) parts.push("✅ 均衡饮食记录 Eating clean!");
    if (checkin.vocab) parts.push("✅ 学了5个健身英语词 5 new words!");
    return `【LiftLingo · 陪你进入力量区】${dateStr}\n\n${parts.length ? parts.join("\n") : "今天在路上，明天继续！"}\n\n铁不分性别，语言没有门槛 💪\n\n#LiftLingo #健身英语 #力量训练 #赵赵是家宝\n#女生练铁 #健身房英语 #进入力量区 #抖音健身`;
  };

  const copyCaption = () => {
    navigator.clipboard.writeText(generateCaption()).then(() => { setCopied(true); setTimeout(()=>setCopied(false),2200); });
  };

  const downloadCheckin = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = 800; canvas.height = 800;
    ctx.fillStyle = "#1a1a2e"; ctx.fillRect(0,0,800,800);
    ctx.fillStyle = "#FD9033"; ctx.fillRect(0,0,12,800);
    ctx.fillStyle = "#F4A84A"; ctx.font = "bold 20px sans-serif"; ctx.fillText("LiftLingo · @赵赵是家宝", 56,96);
    ctx.fillStyle = "#fff"; ctx.font = "bold 54px Georgia"; ctx.fillText("陪你进入力量区", 56,164);
    ctx.fillStyle = "#FD9033"; ctx.font = "22px sans-serif"; ctx.fillText(dateStr, 56,208);
    let y = 290;
    [["workout","💪 Workout 训练"],["diet","🥗 Diet 饮食"],["vocab","📖 Vocab 词汇"]].forEach(([k,label]) => {
      ctx.fillStyle = checkin[k] ? "#388e3c" : "#2a2a40";
      ctx.beginPath(); ctx.roundRect(56,y,688,72,14); ctx.fill();
      ctx.fillStyle = checkin[k] ? "#fff" : "#666";
      ctx.font = "bold 26px sans-serif"; ctx.fillText(`${checkin[k]?"✅":"⬜"} ${label}`, 84, y+47);
      y += 90;
    });
    ctx.fillStyle = "#F4A84A"; ctx.font = "20px sans-serif"; ctx.fillText("@赵赵是家宝 · LiftLingo", 56, 714);
    ctx.fillStyle = "#444"; ctx.font = "18px sans-serif"; ctx.fillText("陪你进入力量区", 56, 754);
    const link = document.createElement("a");
    link.download = `checkin_${todayKey}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div>
      <div style={{ ...S.card, marginBottom:16 }}>
        <div style={{ fontSize:15, fontWeight:800, fontFamily:"Georgia,serif", color:"#1a1a2e", marginBottom:12 }}>
          🎬 本周抖音计划 Weekly Douyin Plan
        </div>
        {DOUYIN_SCHEDULE.map((item,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid #f5f5f5" }}>
            <span style={{ fontSize:20, width:28 }}>{item.emoji}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, color:"#333", fontFamily:"sans-serif" }}>{item.title}</div>
              <div style={{ fontSize:11, color:"#aaa", fontFamily:"sans-serif" }}>{item.day} {item.zh}</div>
            </div>
            <span style={{ background: item.status==="recorded"?"#E6F4F4":item.status==="planned"?"#e3f2fd":"#fff9e6", color:item.status==="recorded"?"#388e3c":item.status==="planned"?"#1565c0":"#f57f17", borderRadius:20, padding:"3px 10px", fontSize:10, fontWeight:700, fontFamily:"sans-serif", whiteSpace:"nowrap" }}>
              {item.status==="recorded"?"已录制":item.status==="planned"?"计划中":"构思中"}
            </span>
          </div>
        ))}
        <a href="https://www.douyin.com" target="_blank" rel="noopener noreferrer" style={{ display:"block", marginTop:12, textAlign:"center", padding:"10px", borderRadius:12, background:"#1a1a2e", color:"#fff", fontSize:13, textDecoration:"none", fontFamily:"sans-serif" }}>
          🎵 打开抖音发布 Open Douyin ↗
        </a>
      </div>

      <div style={{ ...S.card }}>
        <div style={{ fontSize:15, fontWeight:800, fontFamily:"Georgia,serif", color:"#1a1a2e", marginBottom:4 }}>
          📸 打卡截图 Checkin Card
        </div>
        <div style={{ fontSize:12, color:"#888", marginBottom:14, fontFamily:"sans-serif" }}>今天完成了哪些？</div>
        {[["workout","🏋️ 完成训练 Workout done"],["diet","🥗 饮食记录 Diet logged"],["vocab","📖 词汇学习 Vocab studied"]].map(([k,label]) => (
          <div key={k} onClick={() => setCheckin(p=>({...p,[k]:!p[k]}))} style={{
            display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderRadius:12, marginBottom:8, cursor:"pointer",
            background: checkin[k] ? "#E6F4F4" : "#f8f8fc",
            border:"1.5px solid " + (checkin[k] ? "#a5d6a7" : "#f0f0f0"),
            transition:"all 0.2s",
          }}>
            <span style={{ fontSize:20 }}>{checkin[k]?"✅":"⬜"}</span>
            <span style={{ fontSize:14, color: checkin[k] ? "#388e3c" : "#666", fontFamily:"sans-serif", fontWeight: checkin[k] ? 700 : 400 }}>{label}</span>
          </div>
        ))}

        <div style={{ background:"#1a1a2e", borderRadius:16, padding:"20px", marginTop:14, color:"#fff", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:6, background:"#FD9033" }} />
          <div style={{ fontSize:12, color:"#FECB8A", marginBottom:4, fontFamily:"sans-serif" }}>LiftLingo · @赵赵是家宝</div>
          <div style={{ fontSize:22, fontWeight:800, fontFamily:"Georgia,serif" }}>陪你进入力量区</div>
          <div style={{ fontSize:12, color:"#F4A84A", marginBottom:14, fontFamily:"sans-serif" }}>{dateStr}</div>
          {[["workout","💪 Workout 训练"],["diet","🥗 Diet 饮食"],["vocab","📖 Vocab 词汇"]].map(([k,label]) => (
            <div key={k} style={{ background: checkin[k] ? "#388e3c" : "#2a2a40", borderRadius:10, padding:"8px 12px", fontSize:13, color: checkin[k] ? "#fff" : "#888", fontFamily:"sans-serif", marginBottom:6 }}>
              {checkin[k]?"✅":"⬜"} {label}
            </div>
          ))}
          <div style={{ fontSize:11, color:"#F4A84A", marginTop:12, fontFamily:"sans-serif" }}>@赵赵是家宝 · 抖音/小红书</div>
        </div>
        <canvas ref={canvasRef} style={{ display:"none" }} />
        <div style={{ display:"flex", gap:10, marginTop:12 }}>
          <button onClick={downloadCheckin} style={{ ...S.btn("#1a1a2e","#fff"), flex:1, textAlign:"center", padding:"12px 0" }}>📥 下载图片</button>
          <button onClick={copyCaption} style={{ ...S.btn(copied?"#E6F4F4":"#f0f0f7", copied?"#388e3c":"#FD9033"), flex:1, textAlign:"center", padding:"12px 0" }}>
            {copied ? "✅ Copied!" : "📋 复制文案"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FitWithZhaoV3() {
  const [activeTab, setActiveTab] = useState("plan");
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const streak = 12;
  const todayPlan = WEEKLY_PLAN[[6,0,1,2,3,4,5][new Date().getDay()]];

  const handleStartWorkout = (exercises) => { setWorkoutExercises(exercises); setActiveTab("workout"); };

  return (
    <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:"#f6f6fb", fontFamily:"sans-serif" }}>
      <div style={{ background:"#1a1a2e", padding:"20px 20px 16px", color:"#fff" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:2, color:"#F4A84A", fontWeight:700, textTransform:"uppercase" }}>Walk into the weight room.</div>
            <div style={{ fontSize:26, fontWeight:900, fontFamily:"Georgia,serif", marginTop:3, lineHeight:1.1 }}>LiftLingo</div>
            <div style={{ fontSize:12, color:"#FECB8A", marginTop:2 }}>陪你进入力量区</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:11, color:"#FECB8A" }}>Today · 今天</div>
            <div style={{ fontSize:13, fontWeight:700, color:"#fff", marginTop:2 }}>{todayPlan.emoji} {todayPlan.label}</div>
            <div style={{ display:"flex", gap:3, marginTop:6, justifyContent:"flex-end" }}>
              {["M","T","W","T","F","S","S"].map((d,i) => (
                <div key={i} style={{ width:22, height:22, borderRadius:"50%", background: i<5?"#FD9033":"rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, color:"#fff", fontWeight:700 }}>{d}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop:12, background:"rgba(255,255,255,0.06)", borderRadius:12, padding:"10px 14px", display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:22 }}>🔥</span>
          <div>
            <span style={{ fontSize:18, fontWeight:800, fontFamily:"Georgia,serif" }}>{streak} days streak</span>
            <div style={{ fontSize:11, color:"#FECB8A" }}>连续打卡 · Keep going!</div>
          </div>
        </div>
      </div>

      <div style={{ display:"flex", background:"#fff", padding:"6px 10px", gap:2, boxShadow:"0 2px 10px rgba(0,0,0,0.05)" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            flex:1, padding:"7px 2px", border:"none", borderRadius:10,
            background: activeTab===t.id ? "#1a1a2e" : "transparent",
            color: activeTab===t.id ? "#fff" : "#999",
            cursor:"pointer", transition:"all 0.2s", fontFamily:"sans-serif",
          }}>
            <div style={{ fontSize:17 }}>{t.icon}</div>
            <div style={{ fontSize:9, marginTop:1, fontWeight: activeTab===t.id ? 700 : 400 }}>{t.en}</div>
            <div style={{ fontSize:8, opacity:0.7 }}>{t.zh}</div>
          </button>
        ))}
      </div>

      <div style={{ padding:"14px 14px 60px" }}>
        {activeTab==="plan" && <PlanTab onStartWorkout={handleStartWorkout} />}
        {activeTab==="workout" && <WorkoutTab exercises={workoutExercises} />}
        {activeTab==="diet" && <DietTab />}
        {activeTab==="vocab" && <VocabTab />}
        {activeTab==="share" && <ShareTab />}
      </div>

      <div style={{ textAlign:"center", padding:"8px 0 24px", fontSize:10, color:"#ccc", fontFamily:"sans-serif" }}>
        @赵赵是家宝 · LiftLingo ✨
      </div>
    </div>
  );
}
