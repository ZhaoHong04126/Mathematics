import Calculus_Ch1_Overview from './chapters/Calculus/ch1/Calculus_Ch1_Overview';
import Calculus_1_1 from './chapters/Calculus/ch1/Calculus_1_1';
import Calculus_1_2 from './chapters/Calculus/ch1/Calculus_1_2';
import Calculus_1_3 from './chapters/Calculus/ch1/Calculus_1_3';
import Calculus_1_4 from './chapters/Calculus/ch1/Calculus_1_4';
import Calculus_1_5 from './chapters/Calculus/ch1/Calculus_1_5';
import Calculus_1_6 from './chapters/Calculus/ch1/Calculus_1_6';


import Calculus_Ch2_Overview from './chapters/Calculus/ch2/Calculus_Ch2_Overview';
import Calculus_2_1 from './chapters/Calculus/ch2/Calculus_2_1';
import Calculus_2_2 from './chapters/Calculus/ch2/Calculus_2_2';
import Calculus_2_3 from './chapters/Calculus/ch2/Calculus_2_3';
import Calculus_2_4 from './chapters/Calculus/ch2/Calculus_2_4';
import Calculus_2_5 from './chapters/Calculus/ch2/Calculus_2_5';


import Calculus_Ch3_Overview from './chapters/Calculus/ch3/Calculus_Ch3_Overview';
import Calculus_3_1 from './chapters/Calculus/ch3/Calculus_3_1';
import Calculus_3_2 from './chapters/Calculus/ch3/Calculus_3_2';
import Calculus_3_3 from './chapters/Calculus/ch3/Calculus_3_3';
import Calculus_3_4 from './chapters/Calculus/ch3/Calculus_3_4';
import Calculus_3_5 from './chapters/Calculus/ch3/Calculus_3_5';
import Calculus_3_6 from './chapters/Calculus/ch3/Calculus_3_6';
import Calculus_3_7 from './chapters/Calculus/ch3/Calculus_3_7';
import Calculus_3_8 from './chapters/Calculus/ch3/Calculus_3_8';

import Calculus_Ch4_Overview from './chapters/Calculus/ch4/Calculus_Ch4_Overview';
import Calculus_4_1 from './chapters/Calculus/ch4/Calculus_4_1';
import Calculus_4_2 from './chapters/Calculus/ch4/Calculus_4_2';
import Calculus_4_3 from './chapters/Calculus/ch4/Calculus_4_3';
import Calculus_4_4 from './chapters/Calculus/ch4/Calculus_4_4';

import LR5 from './chapters/info/LR_5';

export const chaptersData = [
  // 1. 微積分
  {
    id: "ch1",
    title: "微積分",
    content: "",
    topics: [
      // 第一章：函數
      {
        id: "1-1",
        title: "第一章：函數",
        component: Calculus_Ch1_Overview,
        subtopics: [
          {
            id: "1-1-1",
            title: "1.1 何謂函數 ?",
            component: Calculus_1_1
          },
          {
            id: "1-1-2",
            title: "1.2 冪函數與多項式函數",
            component: Calculus_1_2
          },
          {
            id: "1-1-3",
            title: "1.3 合成函數與反函數",
            component: Calculus_1_3
          },
          {
            id: "1-1-4",
            title: "1.4 三角函數與反三角函數",
            component: Calculus_1_4
          },
          {
            id: "1-1-5",
            title: "1.5 指數函數與對數函數",
            component: Calculus_1_5
          },
          {
            id: "1-1-6",
            title: "1.6 雙曲函數與反雙曲函數",
            component: Calculus_1_6
          },
        ]
      },
      // 第二章：極限與連續性
      {
        id: "1-2",
        title: "第二章：極限與連續性",
        component: Calculus_Ch2_Overview,
        subtopics: [
          {
            id: "1-2-1",
            title: "2.1 極限的直觀定義",
            component: Calculus_2_1
          },
          {
            id: "1-2-2",
            title: "2.2 極限的嚴格定義與運算法則",
            component: Calculus_2_2
          },
          {
            id: "1-2-3",
            title: "2.3 無窮極限與漸近線",
            component: Calculus_2_3
          },
          {
            id: "1-2-4",
            title: "2.4 函數的連續性與重要定理",
            component: Calculus_2_4
          },
          {
            id: "1-2-5",
            title: "2.5 常用極限公式",
            component: Calculus_2_5
          }
        ]
      },
      // 第三章：微分
      {
        id: "1-3",
        title: "第三章：微分",
        component: Calculus_Ch3_Overview,
        subtopics: [
          {
            id: "1-3-1",
            title: "3.1 導數的定義與切線斜率",
            component: Calculus_3_1
          },
          {
            id: "1-3-2",
            title: "3.2 導數函數與可微性",
            component: Calculus_3_2
          },
          {
            id: "1-3-3",
            title: "3.3 基本微分公式與乘除法法則",
            component: Calculus_3_3
          },
          {
            id: "1-3-4",
            title: "3.4 常見函數的導數",
            component: Calculus_3_4
          },
          {
            id: "1-3-5",
            title: "3.5 連鎖法則、隱函數與反函數微分",
            component: Calculus_3_5
          },
          {
            id: "1-3-6",
            title: "3.6 反三角函數的導數",
            component: Calculus_3_6
          },
          {
            id: "1-3-7",
            title: "3.7 對數微分法與高階導數",
            component: Calculus_3_7
          },
          {
            id: "1-3-8",
            title: "3.8 (補充) 雙曲函數的導數與反函數的導數",
            component: Calculus_3_8
          }
        ]
      },
      // 第四章：微分的應用
      {
        id: "1-4",
        title: "第四章：微分的應用",
        component: Calculus_Ch4_Overview,
        subtopics: [
          { 
            id: "1-4-1", 
            title: "4.1 導函數與函數性質", 
            component: Calculus_4_1 
          },
          { 
            id: "1-4-2", 
            title: "4.2 極值問題", 
            component: Calculus_4_2 
          },
          { 
            id: "1-4-3", 
            title: "4.3 均值定理", 
            component: Calculus_4_3 
          },
          { 
            id: "1-4-4", 
            title: "4.4 洛必達法則", 
            component: Calculus_4_4 
          }
        ]
      },
      // 第五章：積分
      {
        id: "1-5",
        title: "第五章：積分",
        content: "未有此內容",
        // component: [] // Calculus_5_1
      },
      // 第六章：積分技巧
      {
        id: "1-6",
        title: "第六章：積分技巧",
        content: "未有此內容",
        // component: [] // Calculus_6_1
      },
      // 第七章：無窮數列與級數
      {
        id: "1-7",
        title: "第七章：無窮數列與級數",
        content: "未有此內容",
        // component: [] // Calculus_7_1
      }
    ]
  },

  // 2. 線性代數
  {
    id: "ch2",
    title: "線性代數",
    content: "",
    topics: [
    //   {
    //     id: "2-1",
    //     title: "第一章：矩陣與行列式",
    //     subtopics: [
    //       {
    //         id: "2-1-1",
    //         title: "1.1 矩陣運算與基本性質",
    //         content: "未有此內容"
    //       },
    //       {
    //         id: "2-1-2",
    //         title: "1.2 行列式的幾何意義與計算",
    //         content: "未有此內容"
    //       }
    //     ]
    //   },
    //   {
    //     id: "2-2",
    //     title: "第二章：向量空間",
    //     content: "未有此內容"
    //   },
    //   {
    //     id: "2-3",
    //     title: "第三章：特徵值與特徵向量",
    //     content: "未有此內容"
    //   }
    ]
  },

  // 3. 多變量微積分
  {
    id: "ch3",
    title: "多變量微積分",
    content: "",
    topics: [
      // {
      //   id: "3-1",
      //   title: "第一章：空間幾何與偏導函數",
      //   subtopics: [
      //     {
      //       id: "3-1-1",
      //       title: "1.1 偏導數與切平面",
      //       content: "未有此內容"
      //     },
      //     {
      //       id: "3-1-2",
      //       title: "1.2 方向導數與梯度",
      //       content: "未有此內容"
      //     }
      //   ]
      // },
      // {
      //   id: "3-2",
      //   title: "第二章：多重積分",
      //   content: "未有此內容"
      // },
      // {
      //   id: "3-3",
      //   title: "第三章：向量微積分",
      //   content: "未有此內容"
      // }
    ]
  },

  // 4. 機率論
  {
    id: "ch4",
    title: "機率論",
    content: "",
    topics: []
  },

  // 5. 數學財務經濟
  {
    id: "ch5",
    title: "數學財務經濟",
    content: "",
    topics: []
  },
  // 6. 資訊與資源
  {
    id: "info",
    title: "資訊與資源",
    topics: [
      {
        id: "LR-1",
        title: "線上學習資源",
        content: "未有此內容"
      },
      {
        id: "LR-2",
        title: "教材與書籍推薦",
        content: "未有此內容"
      },
      {
        id: "LR-5",
        title: "本網頁撰寫路程與記錄",
        component: LR5
      }
    ]
  }
];