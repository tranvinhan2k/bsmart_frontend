// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Box,
  Button as MUIButton,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Carousel, {
  RenderArrowProps,
  RenderPaginationProps,
} from 'react-elastic-carousel';
import { FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import LazyLoadingScreen from '~/components/atoms/LazyLoadingScreen';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
interface CustomCarouselProps {
  label?: string;
  items: any[];
  isLoading: boolean;
  renderItem: (item: any) => ReactNode;
}
export default function CustomCarousel({
  label,
  items,
  isLoading,
  renderItem,
}: CustomCarouselProps) {
  const renderArrow = ({ type, onClick }: RenderArrowProps) => {
    if (type === 'NEXT') {
      return (
        <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <MUIButton onClick={onClick}>
            <Icon name="next2" size="medium" />
          </MUIButton>
        </Stack>
      );
    }
    return (
      <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <MUIButton onClick={onClick}>
          <Icon name="previous" size="medium" />
        </MUIButton>
      </Stack>
    );
  };

  const renderNavigationDot = ({
    onClick,
    activePage,
    pages,
  }: RenderPaginationProps) => {
    return (
      <Stack flexDirection="row" marginY={1}>
        {pages.map((page) => (
          <Box key={page}>
            <IconButton onClick={() => onClick(`${page}`)}>
              <Icon
                name="dot"
                size="small"
                color={activePage === page ? 'navy' : 'grey'}
              />
            </IconButton>
          </Box>
        ))}
      </Stack>
    );
  };
  return (
    <Stack>
      {label && (
        <Typography
          sx={{ fontFamily: FontFamily.bold, fontSize: FontSize.medium_24 }}
        >
          {label}
        </Typography>
      )}
      <Stack sx={{ marginTop: MetricSize.medium_15 }}>
        {isLoading ? (
          <Stack>
            <LazyLoadingScreen />
          </Stack>
        ) : (
          <Carousel
            breakPoints={breakPoints}
            renderArrow={renderArrow}
            renderPagination={renderNavigationDot}
          >
            {items.map((item) => (
              <div style={{ margin: MetricSize.small_5 }} key={item.id}>
                {renderItem(item)}
              </div>
            ))}
          </Carousel>
        )}
      </Stack>
    </Stack>
  );
}

CustomCarousel.defaultProps = {
  label: '',
};
