const mocks = {
  discount: {
    get: {
      url: "/discounts/:discount_id/",
      mock_data: {
        id: "609282579",
      },
    },
  },
  category: {
    get: {
      url: "/categories/:category_id/",
      mock_data: {
        id: "101",
      },
    },
  },
}

export { mocks }
