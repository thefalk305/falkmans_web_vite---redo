import { ref } from 'vue'

  // position each branch in the tree [top, left, width]
const familyTreeLocs = [
  [50, -350, 370], // mgroup0
  [196, -75, 370], // mgroup1
  [434, -580, 370], // mgroup2
  [434, 414, 370], // mgroup3
  [718, -1383, 370], // mgroup4
  [718, -460, 370], // mgroup5
  [718, 279, 370], // mgroup6
  [718, 1154, 370], // mgroup7
  [1002, -2000, 370], // mgroup8
  [1002, -1450, 370], // mgroup9
  [1002, -900, 370], // mgroup11
  [1002, -350, 370], // mgroup11
  [1002, 200, 370], // mgroup12
  [1002, 750, 370], // mgroup13
  [1002, 1300, 370], // mgroup14
  [1002, 1850, 370], // mgroup15
  [1286, -2635, 370], // mgroup16
  [1286, -2000, 370], // mgroup17
  [1356, -1272, 370], // mgroup18
  [1286, 1955, 370], // mgroup19
  [1286, 2485, 370], // mgroup20
  [1536, -3355, 370], // mgroup21
  [1536, -505, 370], // mgroup22
  [1806, -3726, 370], // mgroup23
  [1806, -3005, 370], // mgroup24
  [1806, -1185, 370], // mgroup25
  [1806, 600, 370], // mgroup26
  [2066, -3305, 370], // mgroup27
  [2066, -2605, 370], // mgroup28
  [2066, -1485, 370], // mgroup29
  [2066, -785, 370], // mgroup30
  [2066, 400, 370], // mgroup31
  [2326, -3005, 370], // mgroup32
  [2326, -2455, 370], // mgroup33
  [2326, -1785, 370], // mgroup34
  [2326, -1085, 370], // mgroup35
  [2326, -485, 370], // mgroup36
  [2326, 100, 370], // mgroup37
  [2586, -2085, 370], // mgroup42
  [2586, -1385, 370], // mgroup38
  [2586, 485, 370], // mgroup43
  [2846, -1085, 370], // mgroup39
  [3106, -1485, 370], // mgroup40
  [3366, -1785, 370], // mgroup41
];
// id's in database table of each family member
// determines who is in each branch
const familyTree = 
  //group, id's
[
  [0, [4, 5, 6, 7, 8]],
  [1, [2, 13]],
  [2, [17, 39]],
  [3, [10, 11]],
  [4, [15, 16]],
  [5, [48, 45]],
  [6, [55, 56]],
  [7, [26, 28]],
  [8, [57, 58]],
  [9, [59, 60, 61]],
  [10, [68, 49, 4]],
  [11, [46, 69, 5]],
  [12, [2, 13, 6]],
  [13, [2, 13, 7]],
  [14, [2, 13]],
  [15, [29, 30]],
  [16, [62, 63, 99]],
  [17, [64, 65]],
  [18, [66, 67]],
  [19, [31, 32]],
  [20, [70, 71, 4]],
  [21, [73, 74]],
  [22, [72, 76]],
  [23, [100, 101]],
  [24, [102, 103]],
  [25, [75, 77]],
  [26, [78, 79]],
  [27, [104, 105]],
  [28, [108, 109]],
  [29, [82, 83]],
  [30, [85, 115]],
  [31, [80, 81]],
  [32, [110, 111]],
  [33, [112, 113]],
  [34, [84, 117]],
  [35, [86, 87]],
  [36, [98, 116]],
  [37, [94, 95]],
  [42, [114, 117]],
  [38, [88, 89]],
  [43, [96, 97]],
  [39, [90, 91]],
  [40, [92, 117]],
  [41, [93, 117]],
];

  // twigData determines position of each 'twig' (interconnecting lines) on family tree
  const twigData = [
    [[[""]], [[""]], [["ibtopline"]]],
    [
      // mgroup1
      [["leftwig"], ["left:-319px; width:319px; height:162px"]],
      [["rightwig"], ["left:355px; width:319px; height:162px"]],
      [["stline"]],
    ],
    [
      // mgroup2
      [["leftwig"], ["left:-550px; width:550px; height:206px"]],
      [["rightwig"], ["left:365px; width:5px; height:206px"]],
      [[""]],
    ],
    [
      // mgroup3
      [["leftwig"], ["left:0px; width:5px; height:206px"]],
      [["rightwig"], ["left:400px; width:500px; height:206px"]],
      [[""]],
    ],
    [
      // mgroup4
      [["leftwig"], ["left:-450px; width:450px; height:208px"]],
      [["leftwig"], ["top:208px; left:100px; width:245px; height:75px"]],
      [["upcurve1"]],
    ],
    [
      // mgroup5
      [["leftwig"], ["left:-250px; width:250px; height:208px"]],
      [["rightwig"], ["left:360px; width:5px; height:208px"]],
      [[""]],
    ],
    [
      // mgroup6
      [["leftwig"], ["left:0px; width:5px; height:208px"]],
      [["rightwig"], ["left:355px; width:300px; height:208px"]],
      [[""]],
    ],
    [
      // mgroup7
      [["rightwig"], ["left:25px; top: 208px; width:320px; height:75px"]],
      [["rightwig"], ["left:350px; width:500px; height:208px"]],
      [["upcurve2"]],
    ],
    [
      // mgroup8
      [["leftwig"], ["left:-450px; width:450px; height:208px"]],
      [["leftwig"], ["top:208px; left:190px; width: 156px; height:75px"]],
      [["upcurve1"]],
    ],
    [
      // mgroup9
      [["leftwig"], ["left:369px; width:5px; height:277px"]],
      [["leftwig"], ["top:230px; left:22px; width:150px; height:1px"]],
      [["upcurve2"], ["top:130px"]],
    ],
    [
      // mgroup10
      [["rightwig"], ["left:25px; top: 230px; width:200px; height:1px"]],
      [["upcurve2"], ["top:130px"]],
      [[""]],
    ],
    [
      // mgroup11
      [["rightwig"], ["left:25px; top: 230px; width:200px; height:1px"]],
      [["upcurve2"], ["top:130px"]],
      [[""]],
    ],
    [
      // mgroup12
      [["rightwig"], ["left:25px; top: 230px; width:200px; height:1px"]],
      [["upcurve2"], ["top:130px"]],
      [[""]],
    ],
    [
      // mgroup13
      [["rightwig"], ["left:25px; top: 230px; width:200px; height:1px"]],
      [["upcurve2"], ["top:130px"]],
      [[""]],
    ],
    [
      // mgroup14
      [[""], [""]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup15
      [["rightwig"], ["left:25px; top: 208px; width:215px; height:75px"]],
      [["rightwig"], ["left:415px; width:400px; height:208px"]],
      [["upcurve2"]],
    ],
    [
      // mgroup16
      [["leftwig"], ["left:-450px; width:450px; height:174px"]],
      [["leftwig"], ["top:230px; left:205px; width:150px"]],
      [["upcurve1"], ["top:130px"]],
    ],
    [
      // mgroup17
      [[""], [""]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup18
      [["rightwig"], ["left:355px; width:556px; height:104px"]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup19
      [[""], [""]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup20
      [["rightwig"], ["left:25px; top: 230px; width:200px; height:1px"]],
      [["upcurve2"], ["top:130px"]],
      [[""]],
    ],
    [
      // mgroup21
      [["leftwig"], ["left:-190px; width:200px; height:194px"]],
      [["rightwig"], ["left:355px; width:156px; height:194px"]],
      [[""], [""]],
    ],
    [
      // mgroup22
      [["leftwig"], ["left:-590px; width:600px; height:194px"]],
      [["rightwig"], ["left:355px; width:856px; height:194px"]],
      [[""], [""]],
    ],
    [
      // mgroup23
      [[""], [""]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup24
      [["leftwig"], ["left:-190px; width:200px; height:184px"]],
      [["rightwig"], ["left:355px; width:156px; height:184px"]],
      [[""], [""]],
    ],
    [
      // mgroup25
      [["leftwig"], ["left:-120px; width:80px; height:184px"]],
      [["rightwig"], ["left:355px; width:156px; height:184px"]],
      [[""], [""]],
    ],
    [
      // mgroup26
      [["leftwig"], ["left:-90px; width:100px; height:184px"]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup27
      [[""], [""]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup28
      [["leftwig"], ["left:-120px; width:80px; height:184px"]],
      [["rightwig"], ["left:355px; width:100px; height:184px"]],
      [[""], [""]],
    ],
    [
      // mgroup29
      [[""], [""]],
      [[""], [""]],
      [["leftwig"], ["left:-190px; width:200px; height:184px"]],
    ],
    [
      // mgroup30
      [["leftwig"], ["left:-190px; width:200px; height:184px"]],
      [["rightwig"], ["left:355px; width:156px; height:184px"]],
      [[""], [""]],
    ],
    [
      // mgroup31
      [["leftwig"], ["left:-190px; width:200px; height:184px"]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup32
      [[""], [""]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup33
      [[""], [""]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup34
      [["leftwig"], ["left:-190px; width:200px; height:184px"]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup35
      [["leftwig"], ["left:-190px; width:200px; height:184px"]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup36
      [[""], [""]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup37
      [["rightwig"], ["left:355px; width:156px; height:184px"]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup42
      [[""], [""]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup38
      [["rightwig"], ["left:355px; width:156px; height:184px"]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup43
      [[""], [""]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup39
      [["leftwig"], ["left:-190px; width:200px; height:184px"]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup40
      [["leftwig"], ["left:-190px; width:200px; height:184px"]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup41
      [[""], [""]],
      [[""], [""]],
      [[""], [""]],
    ],
    [
      // mgroup44
      [[""], [""]],
      [[""], [""]],
      [[""], [""]],
    ],
  ];


export default {
  familyTree: familyTree,
  familyTreeLocs: familyTreeLocs,
  twigData: twigData,
}