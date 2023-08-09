import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatchGetAllDayOfWeeks, useDispatchGetAllSlots } from '~/hooks';
import { Color, FontFamily, FontSize } from '~/assets/variables';

export interface TimetablePayload {
  dayOfWeekId: number;
  slotId: number;
}

interface Props {
  data: TimetablePayload[];
}

export default function Timetable({ data }: Props) {
  const { dayOfWeeks } = useDispatchGetAllDayOfWeeks();
  const { slots } = useDispatchGetAllSlots();

  const [columns, setColumns] = useState<GridColDef<any, any, any>[]>();
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    if (slots && dayOfWeeks) {
      const dayOfWeekData = dayOfWeeks.reduce((obj: any, item) => {
        // eslint-disable-next-line no-param-reassign
        obj[item.code] = false;
        return obj;
      }, []);

      const tempRows: any[] = slots.map((item) => {
        return {
          ...dayOfWeekData,
          id: item.id,
          code: item.code,
          slot: `${item.startTime} - ${item.endTime}`,
        };
      });
      setRows(tempRows);

      const tempColumns: GridColDef[] = [
        {
          field: 'slot',
          headerName: 'Khung giờ học',
          flex: 1,
          minWidth: 120,
        },
      ];

      dayOfWeeks.map((item) => {
        tempColumns.push({
          headerName: item.name,
          minWidth: 100,
          flex: 1,
          disableColumnMenu: true,
          sortable: false,
          field: item.code,
          renderCell: (rowParam: GridRenderCellParams<any, any, any>) => {
            // return `${JSON.stringify(rowParam.row[`${item.code}`])}`;
            return (
              rowParam.row[`${item.code}`] && (
                <Stack
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: Color.grey3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                    margin: -1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: FontSize.small_14,
                      fontFamily: FontFamily.bold,
                    }}
                  >
                    {rowParam.row[`${item.code}`].dayOfWeek}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: '10px',
                      fontFamily: FontFamily.light,
                    }}
                  >
                    {rowParam.row[`${item.code}`].slot}
                  </Typography>
                </Stack>
              )
            );
          },
        });
        return null;
      });

      setColumns(() => tempColumns);
    }
  }, [dayOfWeeks, slots]);

  React.useEffect(() => {
    if (data?.length > 0) {
      data.map((slotTime) => {
        const { dayOfWeekId, slotId } = slotTime;
        const slot = slots?.find((item) => item.id === slotId);
        const dayOfWeek = dayOfWeeks?.find((item) => item.id === dayOfWeekId);
        const index = rows.findIndex((item) => item.id === slotId);

        if (index !== -1 && dayOfWeek) {
          rows[index][dayOfWeek?.code] = {
            slot: `${slot?.startTime} - ${slot?.endTime}`,
            dayOfWeek: `${dayOfWeek?.name.toUpperCase()} `,
          };
        }
        return null;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, data]);

  if (!data || data?.length === 0)
    return <Typography>Lớp học chưa có thời khóa biểu</Typography>;

  return (
    <Box sx={{ background: '#F3F1F5' }}>
      {rows && columns && (
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          hideFooter
          density="compact"
          sx={{
            'MuiDataGrid-cell': {
              padding: 0,
            },
            'MuiDataGrid-columnHeaderTitle': {
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.bold,
              color: Color.black,
            },
          }}
        />
      )}
    </Box>
  );
}
