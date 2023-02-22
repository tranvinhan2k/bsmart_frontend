import { Stack, Tooltip, Typography } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { SX_CONTRACT_STACK } from '~/components/molecules/ContractBar/styles';
import { ContractPayload } from '~/models';
import { IconName } from '~/models/icon';

interface ContractBarProps {
  color: 'white' | 'black';
  contracts: ContractPayload[];
}
function ContractBar({ color, contracts }: ContractBarProps) {
  return (
    <Stack>
      {contracts &&
        contracts.map((contract) => (
          <Tooltip key={contract.name} title={contract.name}>
            <Stack sx={SX_CONTRACT_STACK}>
              <Stack paddingRight={MetricSize.small_5}>
                <Icon
                  name={contract.image as IconName}
                  size="small"
                  color={color}
                />
              </Stack>
              <Stack>
                <Typography
                  sx={{
                    fontFamily: FontFamily.regular,
                    fontSize: FontSize.small_16,
                    color: Color[color],
                  }}
                >
                  {contract.value}
                </Typography>
              </Stack>
            </Stack>
          </Tooltip>
        ))}
    </Stack>
  );
}

export default ContractBar;
