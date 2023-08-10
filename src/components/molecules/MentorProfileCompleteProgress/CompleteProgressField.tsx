import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  CircularProgressProps,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Field } from '~/models/mentorProfiles';

interface CompleteProgressFieldProps {
  data: Field[];
  title: string;
  descComplete: string;
  descMissing: string;
  percentComplete?: number;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          // eslint-disable-next-line react/destructuring-assignment
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function CompleteProgressField({
  data,
  title,
  descComplete,
  descMissing,
  percentComplete,
}: CompleteProgressFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        {data.length <= 0 && (
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: 0 }}>
                {percentComplete && (
                  <Alert
                    severity="success"
                    // icon={false}
                    action={
                      <CircularProgressWithLabel
                        color="success"
                        value={percentComplete}
                      />
                    }
                  >
                    <AlertTitle>
                      <strong>{title}</strong>
                    </AlertTitle>
                    {descComplete}
                  </Alert>
                )}
                {!percentComplete && (
                  <Alert severity="success">
                    <AlertTitle>
                      <strong>{title}</strong>
                    </AlertTitle>
                    {descComplete}
                  </Alert>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
        )}
        {data.length > 0 && (
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: 0 }}>
                <Card>
                  <CardActionArea onClick={() => setShow(!show)}>
                    <CardContent sx={{ padding: 0 }}>
                      {percentComplete && (
                        <Alert
                          severity="error"
                          // icon={false}
                          action={
                            <CircularProgressWithLabel
                              color="error"
                              value={percentComplete}
                            />
                          }
                        >
                          <AlertTitle>
                            <strong>{title}</strong>
                          </AlertTitle>
                          {!show ? 'Chưa hoàn tất. Xem chi tiết' : descMissing}
                        </Alert>
                      )}
                      {!percentComplete && (
                        <Alert severity="warning">
                          <AlertTitle>
                            <strong>{title}</strong>
                          </AlertTitle>
                          {!show ? 'Chưa hoàn tất. Xem chi tiết' : descMissing}
                        </Alert>
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </TableCell>
            </TableRow>
          </TableHead>
        )}
        {data.length > 0 && show && (
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.field}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

CompleteProgressField.defaultProps = {
  percentComplete: undefined,
};
