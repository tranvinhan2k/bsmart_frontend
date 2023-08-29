import { Stack, Button, Typography } from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';
import CustomModal from '~/components/atoms/CustomModal';
import Icon from '~/components/atoms/Icon';
import { useBoolean } from '~/hooks/useBoolean';
import globalStyles from '~/styles';
import { openUrl } from '~/utils/window';

export function DownloadButtonAssignment({ data }: any) {
  const { value, toggle } = useBoolean(false);
  return (
    <Stack>
      <Button
        sx={{
          alignSelf: 'center',
        }}
        variant="contained"
        color="success"
        startIcon={<Icon name="download" size="small_20" color="white" />}
        onClick={toggle}
      >
        Xem tệp đã nộp
      </Button>
      <CustomModal open={value} onClose={toggle} title="Danh sách tệp đã nộp">
        <Stack
          sx={{
            minWidth: '90vw',
          }}
        >
          {data.row?.file?.map((item: any, index: number) => (
            <Stack
              sx={{
                marginTop: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: Color.white4,
                padding: 1,
                borderRadius: MetricSize.small_5,
                boxShadow: 1,
              }}
              key={index}
            >
              <Typography sx={globalStyles.textSmallLight}>
                {item.name}
              </Typography>
              <Button
                variant="contained"
                color="success"
                onClick={() => openUrl(item.url)}
              >
                Tải về
              </Button>
            </Stack>
          ))}
        </Stack>
      </CustomModal>
    </Stack>
  );
}
