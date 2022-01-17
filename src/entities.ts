const test_args = {
    discount_id: '609282579',
    category_id: '101',
}

const entities: any = {
  category: {
    fields: [],
    commands: [
      {
        cmd: "load",
        method: "get",
        path: "/categories/:category_id/",
        include: [],
      },
    ],
    tests: {
      load: {
        args: {
          category_id: test_args.category_id,
        },
        expectations: {
          id: {
            sameAs: test_args.category_id,
          },
        },
      },
    },
  },
  discount: {
    fields: [],
    commands: [
      {
        cmd: "load",
        method: "get",
        path: "/discounts/:discount_id/",
        include: [],
      },
      {
        cmd: "save",
        method: "post",
        path: "/discounts/:discount_id/",
        include: [],
      },
    ],
    tests: {
      load: {
        args: {
          discount_id: test_args.discount_id,
        },
        expectations: {
          id: {
            sameAs: test_args.discount_id,
          },
        },
      },
    },
  },
}

export { entities }
