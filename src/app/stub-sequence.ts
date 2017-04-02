export default [
  {
    type: 'pose',
    name: 'baddha konasana',
    unary: true,
    breaths: 2
  },
  {
    type: 'pose',
    name: 'seated twist',
    breaths: 2
  },
  {
    type: 'series',
    poses: [
      {
        type: 'pose',
        name: 'warrior 2',
        breaths: 2
      },
      {
        type: 'pose',
        name: 'reverse warrior',
        breaths: 2
      },
      {
        type: 'pose',
        name: 'extended warrior variation',
        breaths: 2
      }
    ],
    transitions: [
      {
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
        type: 'pose',
        name: 'warrior 1 archer',
        breaths: 2
      },
      {
        type: 'pose',
        name: 'eagle arms',
        breaths: 2
      },
      {
        type: 'pose',
        name: 'bird wing',
        breaths: 2
      }
    ],
    firstTransitions: [
      {
        type: 'pose',
        name: 'half salutation',
        unary: true,
        breaths: 1
      }
    ],
    secondTransitions: [
      {
        type: 'pose',
        name: 'forearm balance splits',
        breaths: 5
      }
    ]
  },
  {
    type: 'pose',
    name: 'savasana',
    unary: true,
    breaths: 5
  }
];