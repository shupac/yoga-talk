export default [
  {
    id: 0,
    type: 'pose',
    name: 'baddha konasana',
    sides: 'bilateral',
    breaths: 2
  },
  {
    id: 1,
    type: 'pose',
    name: 'seated twist',
    sides: 'unilateral',
    breaths: 2
  },
  {
    type: 'series',
    poses: [
      {
        id: 2,
        type: 'pose',
        name: 'warrior 2',
        sides: 'unilateral',
        breaths: 2
      },
      {
        id: 3,
        type: 'pose',
        name: 'reverse warrior',
        sides: 'unilateral',
        breaths: 2
      },
      {
        id: 4,
        type: 'pose',
        name: 'extended warrior variation',
        sides: 'unilateral',
        breaths: 2
      }
    ],
    firstTransitions: [
      {
        id: 5,
        type: 'pose',
        name: 'down dog',
        sides: 'bilateral',
        breaths: 1
      }
    ]
  },
  {
    type: 'vignette',
    poses: [
      {
        id: 6,
        type: 'pose',
        name: 'warrior 1 archer',
        sides: 'unilateral',
        breaths: 2
      },
      {
        id: 7,
        type: 'pose',
        name: 'eagle arms',
        sides: 'unilateral',
        breaths: 2
      },
      {
        id: 8,
        type: 'pose',
        name: 'bird wing',
        sides: 'unilateral',
        breaths: 2
      }
    ],
    firstTransitions: [
      {
        id: 9,
        type: 'pose',
        name: 'half salutation',
        sides: 'bilateral',
        breaths: 1
      }
    ],
    secondTransitions: [
      {
        id: 10,
        type: 'pose',
        name: 'forearm balance splits',
        sides: 'unilateral',
        breaths: 5
      }
    ]
  },
  {
    id: 11,
    type: 'pose',
    name: 'savasana',
    sides: 'bilateral',
    breaths: 5
  }
];