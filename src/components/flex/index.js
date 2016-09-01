import React, {PropTypes} from "react";
import bindComponent from "util/bind-component";

Flex.debug = true;

export default function Flex(props) {
  const {Component, debug=Flex.debug, width, height, minWidth, minHeight, maxWidth, maxHeight, row, column, reverse, wrap, inline, justify, alignItems, alignContent, alignSelf, grow, shrink, basis, order, scrollable, ...rest} = props;
  const style = {
    width, height, minWidth, minHeight, maxWidth, maxHeight, order,
    position: "relative",
    display: inline ? "inline-flex" : "flex",
    flexDirection: getFlexDirection(row, reverse),
    flexWrap: getFlexWrap(wrap),
    justifyContent: getJustifyContent(justify),
    alignItems: getAlign(alignItems),
    alignContent: getAlign(alignContent),
    alignSelf: getAlign(alignSelf),
    flexGrow: getFlexGrow(grow),
    flexShrink: getFlexShrink(shrink),
    flexBasis: basis,
    outline: debug ? "1px solid #444" : null,
    overflow: scrollable ? "auto" : null
  };
  if(props.style) {
    Object.assign(style, props.style);
  }
  return (<Component {...rest} style={style}/>);
}

Flex.bound = function boundFlex(boundProps) {
  if(!boundProps) return Flex;
  const BoundFlex = bindComponent(Flex, boundProps);
  BoundFlex.bound = bindComponent.bind(null, BoundFlex);
  return BoundFlex;
};

Flex.propTypes = {
  Component: PropTypes.node,
  debug: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  row: PropTypes.bool,
  reverse: PropTypes.bool,
  wrap: PropTypes.bool,
  inline: PropTypes.bool,
  justify: PropTypes.oneOf(["start", "end", "center", "space-between", "space-around"]),
  alignItems: PropTypes.oneOf(["start", "end", "center", "baseline", "stretch"]),
  alignContent: PropTypes.oneOf(["start", "end", "center", "space-between", "space-around", "stretch"]),
  alignSelf: PropTypes.oneOf(["auto", "start", "end", "center", "baseline", "stretch"]),
  grow: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  shrink: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  basis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  order: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Flex.defaultProps = {
  Component: "div"
};

function getJustifyContent(justify) {
  if(justify === "start" || justify === "end") {
    return `flex-${justify}`;
  }
  return justify;
}

function getFlexDirection(row, reverse) {
  const direction = row ? "row" : "column";
  return reverse ? `${direction}-reverse` : direction;
}

function getFlexWrap(wrap) {
  if(wrap === "reverse") {
    return "wrap-reverse";
  }
  return wrap ? "wrap" : "nowrap";
}

function getAlign(align) {
  switch(align) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    default:
      return align;
  }
}

function getFlexGrow(grow) {
  if(typeof grow === "boolean") {
    return grow ? "1" : 0;
  }
  return grow;
}

function getFlexShrink(shrink) {
  return getFlexGrow(shrink);
}
