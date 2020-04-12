import React from "react";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import {
  PagingInfo,
  ResultsPerPage,
  Paging,
  Facet,
  SearchProvider,
  Results,
  SearchBox,
  Sorting
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";

import "@elastic/react-search-ui-views/lib/styles/styles.css";

const connector = new AppSearchAPIConnector({
  searchKey: "search-jhqtyptwrzrhw3j9pirrdgzk",
  engineName: "restaurant-search",
  endpointBase: "https://d0635dc7efd2432191228a3cac4e50c2.app-search.us-central1.gcp.cloud.es.io"
});

const configurationOptions = {
  apiConnector: connector,
  autocompleteQuery: {
    suggestions: {
      types: {
        documents: {
          // Which fields to search for suggestions.
          fields: ["name", "developer"]
        }
      },
      // How many suggestions appear.
      size: 10
    }
  },
  searchQuery: {
    search_fields: {
      // 1. Search by name of video game.
      name: {}
    },
    // 2. Results: name of the video game, its genre, publisher, scores, and platform.

    // 3. Facet by scores, genre, publisher, and platform, which we'll use to build filters later.

  }
};

export default function App() {
  return (
      <SearchProvider config={configurationOptions}>
        <div className="App">
          <Layout
              header={<SearchBox autocompleteSuggestions={true} />}

          />
        </div>
      </SearchProvider>
  );
}
