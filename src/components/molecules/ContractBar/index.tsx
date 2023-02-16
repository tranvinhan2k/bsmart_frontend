import { Stack, Tooltip, Typography } from '@mui/material';
import { IconSize, MetricSize } from '~/assets/variables';
import {
  SX_CONTRACT_STACK,
  SX_CONTRACT_TEXT,
} from '~/components/molecules/ContractBar/styles';
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
            <Stack sx={SX_CONTRACT_STACK}>
              <Stack paddingRight={MetricSize.small_5}>
                <img
                  style={{ width: IconSize.small, height: IconSize.small }}
                  src={contract.image}
                  alt={contract.name}
                />
              </Stack>
              <Stack>
                <Typography sx={SX_CONTRACT_TEXT}>{contract.value}</Typography>
              </Stack>
            </Stack>
          </Tooltip>
        ))}
    </Stack>
  );
}

export default ContractBar;
