export default [
  {
    id: 0,
    type: 'pose',
    name: 'baddha konasana',
    unary: true,
    breaths: 2
  },
  {
    id: 1,
    type: 'pose',
    name: 'seated twist',
    breaths: 2
  },
  {
    type: 'series',
    poses: [
      {
        id: 2,
        type: 'pose',
        name: 'warrior 2',
        breaths: 2
      },
      {
        id: 3,
        type: 'pose',
        name: 'reverse warrior',
        breaths: 2
      },
      {
        id: 4,
        type: 'pose',
        name: 'extended warrior variation',
        breaths: 2
      }
    ],
    firstTransitions: [
      {
        id: 5,
        type: 'pose',
        name: 'down dog',
        unary: true,
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
        breaths: 2
      },
      {
        id: 7,
        type: 'pose',
        name: 'eagle arms',
        breaths: 2
      },
      {
        id: 8,
        type: 'pose',
        name: 'bird wing',
        breaths: 2
      }
    ],
    firstTransitions: [
      {
        id: 9,
        type: 'pose',
        name: 'half salutation',
        unary: true,
        breaths: 1
      }
    ],
    secondTransitions: [
      {
        id: 10,
        type: 'pose',
        name: 'forearm balance splits',
        breaths: 5
      }
    ]
  },
  {
    id: 11,
    type: 'pose',
    name: 'savasana',
    unary: true,
    breaths: 5
  }
];