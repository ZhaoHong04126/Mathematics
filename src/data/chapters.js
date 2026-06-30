import Calculus_1_1 from './chapters/Calculus/ch1/Calculus_1_1';
import Calculus_1_2 from './chapters/Calculus/ch1/Calculus_1_2';
import LR5 from './chapters/info/LR_5';

export const chaptersData = [
  // 1. 微積分 (Calculus)
  {
    id: "ch1",
    title: "微積分",
    content: "",
    topics: [
      {
        id: "1-1",
        title: "第一章：函數",
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
            title: "1.3 三角函數",
            content: "未有此內容"
          },
          {
            id: "1-1-4",
            title: "1.4 指數函數與對數函數",
            content: "未有此內容"
          },
          {
            id: "1-1-5",
            title: "1.5 反函數",
            content: "未有此內容"
          },
          {
            id: "1-1-6",
            title: "1.6 反三角函數",
            content: "未有此內容"
          },
          {
            id: "1-1-7",
            title: "1.7 雙曲函數",
            content: "未有此內容"
          },
          {
            id: "1-1-8",
            title: "1.8 反雙曲函數",
            content: "未有此內容"
          }
        ]
      },
      {
        id: "1-2",
        title: "第二章：極限與連續性",
        content: "未有此內容"
      },
      {
        id: "1-3",
        title: "第三章：導數",
        content: "未有此內容"
      },
      {
        id: "1-4",
        title: "第四章：微分的應用",
        content: "未有此內容"
      },
      {
        id: "1-5",
        title: "第五章：積分",
        content: "未有此內容"
      },
      {
        id: "1-6",
        title: "第六章：積分技巧",
        content: "未有此內容"
      },
      {
        id: "1-7",
        title: "第七章：無窮數列與級數",
        content: "未有此內容"
      }
    ]
  },

  // 2. 線性代數 (Linear Algebra)
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

  // 3. 多變量微積分 (Multivariable Calculus)
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

  // 4. 資訊與資源
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