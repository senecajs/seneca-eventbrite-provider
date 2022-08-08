const mocks = {
  event: {
    post: {
      url: "/events/:event_id/",
      mock_data: {
        id: '238083523227',
        description: { text: '74a46e44d0cb9bcb5f8b', html: '74a46e44d0cb9bcb5f8b' }
      },
    },
    get: {
      url: "/events/:event_id/",
      mock_data: {
        id: '238083523227',
        description: { text: '74a46e44d0cb9bcb5f8b', html: '74a46e44d0cb9bcb5f8b' }
      },
    },
  },
}

export { mocks }
