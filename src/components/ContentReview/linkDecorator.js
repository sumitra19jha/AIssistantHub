import React from "react";
import { CompositeDecorator } from "draft-js";

const Link = ({ entityKey, contentState, children }) => {
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a style={{ color: "blue" }} href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};

export const createLinkDecorator = () =>
  new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);
