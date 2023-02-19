import { Stack, Tooltip, Typography } from '@mui/material';
import { Colors, FontFamilies, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { SX_CONTRACT_STACK } from '~/components/molecules/ContractBar/styles';
import { ContractPayload } from '~/models';

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
              <Stack paddingRight={MetricSize.small}>
                <Icon color={color} size="small" name={contract.image} />
              </Stack>
              <Stack>
                <Typography
                  sx={{
                    fontFamily: FontFamilies.regular,
                    fontSize: FontSize.small,
                    color: Colors[color],
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
