export default {
  widgets: [
    {
      name: "document-list",
      options: {
        title: "Last edited pages",
        order: "_updatedAt desc",
        types: ["page"],
      },
    },
    {
      name: "netlify",
      options: {
        title: "Deploys",
        sites: [
          {
            title: "Website",
            apiId: "47fb429a-9ec0-49b2-a153-699e569e7a9a",
            buildHookId: "609248c59535549a26269a55",
            name: "webriq-page-builder-default-template",
            url: "https://webriq-page-builder-default-template.netlify.app/",
          },
        ],
      },
    },
    {
      name: "google-analytics",
      layout: {
        width: "large",
      },
      options: {
        title: "Last 30 days",
        gaConfig: {
          reportType: "ga",
          query: {
            dimensions: "ga:date",
            metrics: "ga:users, ga:sessions, ga:newUsers",
            "start-date": "30daysAgo",
            "end-date": "yesterday",
          },
          chart: {
            type: "LINE",
            options: {
              width: "100%",
            },
          },
        },
      },
    },
    {
      name: "google-analytics",
      layout: {
        width: "medium",
      },
      options: {
        title: "World map",
        gaConfig: {
          reportType: "ga",
          query: {
            dimensions: "ga:country",
            metrics: "ga:users",
            "start-date": "30daysAgo",
            "end-date": "yesterday",
          },
          chart: {
            type: "GEO",
            width: "100%",
          },
        },
      },
    },
  ],
}
