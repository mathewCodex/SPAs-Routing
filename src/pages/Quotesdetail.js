import { useEffect, Fragment } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
// import { addComment } from "../../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
// const DUMMY_QUOTES = [
//   {
//     id: "q1",
//     author: "Codex",
//     text: "Learning React ",
//   },
//   { id: "q2", author: "Emmanuel", text: "Learning react is good" },
// ];
// const DUMMY_QUOTES = [
//   { id: "q1", author: "Max", text: "Learning React is fun!" },
//   { id: "q2", author: "Maximilian", text: "Learning React is great!" },
// ];
const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  //getting quote id
  const { quoteId } = params;
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }
  // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  if (!loadedQuote.text) {
    return <p>No quote found...</p>;
  }
  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
