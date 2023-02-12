import { Box, Stack, Tooltip, Typography } from '@mui/material';
import {
  Colors,
  FontFamilies,
  FontSize,
  IconSize,
  MetricSize,
} from '~/assets/variables';
import { ContractPayload } from '~/models';

interface ContractBarProps {
  contracts: ContractPayload[];
}
function ContractBar({ contracts }: ContractBarProps) {
  return (
    <Stack>
      {contracts &&
        contracts.map((contract) => (
          <Tooltip key={contract.name} title={contract.name}>
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Stack paddingRight={MetricSize.small}>
                <img
                  style={{ width: IconSize.small, height: IconSize.small }}
                  src={contract.image}
                  alt={contract.name}
                />
              </Stack>
              <Stack>
                <Typography
                  sx={{
                    fontFamily: FontFamilies.regular,
                    fontSize: FontSize.small,
                    color: Colors.white,
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
