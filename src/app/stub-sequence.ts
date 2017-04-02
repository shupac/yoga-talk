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
        breaths: 0
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
    type: 'pose',
    name: 'savasana',
    unary: true,
    breaths: 5
  }
];