import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  let flag;
  switch (variant) {
    case "on-sale":
      flag = <Flag style={{ "--color": COLORS.primary }}>Sale</Flag>;
      break;
    case "new-release":
      flag = <Flag style={{ "--color": COLORS.secondary }}>Just Relased!</Flag>;
      break;
    default:
      flag = null;
      break;
  }
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {flag}
        </ImageWrapper>
        <Spacer size={14} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              "--text-decoration":
                typeof salePrice === "number" ? "line-through" : undefined,
              "--color": variant === "on-sale" ? COLORS.gray[700] : undefined,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  min-width: 275px;
  flex: 1;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
  line-height: 0;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 30px;
  }
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: var(--text-decoration);
  color: var(--color);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  height: 32px;
  padding: 0 10px;
  font-size: ${14 / 18}rem;
  font-weight: ${WEIGHTS.bold};
  line-height: 32px;
  color: ${COLORS.white};
  background-color: var(--color);
  border-radius: 2px;
`;

export default ShoeCard;
