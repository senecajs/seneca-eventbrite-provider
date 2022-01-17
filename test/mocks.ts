const mocks = {
  discount: {
    get: {
      method: "GET",
      url: "/discounts/:discount_id/",
      mock_data: {
        id: "609282579",
      },
    },
  },
  category: {
    get: {
      method: "GET",
      url: "/categories/:category_id/",
      mock_data: {
        id: "101",
      },
    },
  },
}

export { mocks }
