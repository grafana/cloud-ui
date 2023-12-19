# Grafana Cloud UI

This package contains shared UI components.

## Installation

Add the package:

```bash
yarn add @grafana-cloud-ui
```

## Usage

### Alert usage example

```JSX
import { Alert } from '@grafana-cloud/ui';

<Alert status="error">
  Error when creating private data source connect
</Alert>
```

### Table usage example

The table component has many options and is very generic by default, for full info on column definitions and table props see [react-data-table docs](https://react-data-table-component.netlify.app/?path=/docs/getting-started-intro--page).

```JSX
import { Table, TableColumn, ExpanderComponentProps } from '@grafana/cloud-features'
// Config object is required for light/dark theme
import { config } from '@grafana/runtime'

interface MyDataType {
  id: number,
  name: string,
  value: number
}

// Your data, each entry is a row in the table
const data: MyDataType[] = [
  {
    id: 1,
    name: 'A',
    value: '10'
  },
  {
    id: 2,
    name: 'B',
    value: '15'
  },
  {
    id: 3,
    name: 'C',
    value: '20'
  }
];

// Column definition, see react-data-table-component docs for all options
const columns: Array<TableColumn<MyDataType>> = [
  {
    name: 'ID',
    selector: (row: MyDataType) => row.id,
    sortable: true,
  },
  {
    name: 'Name',
    selector: (row: MyDataType) => row.name,
    sortable: true,
    width: '100px',
  },
  {
    name: 'Value',
    selector: (row: MyDataType) => row.value,
    sortable: true,
    sortFunction: (a: MyDataType, b: MyDataType) => a.value - b.value,
    // eslint-disable-next-line react/display-name
    cell: (row: MyDataType) => (
      <div>
        Custom cell rendering here {row.value}
      </div>
    ),
    maxWidth: '300px',
  },
]

// It is also sometimes helpful to make the column definition into a function if you need to pass additional information into the table columns
const columns = (hideCertainColumn: boolean) => {
  return [
    {
      name: 'Conditional column',
      selector: (row: SomeType) => row.id,
      omit: hideCertainColumn
    }
  ]
}

// Optional component for expandable table rows, data prop will have all fields in a row
const TableActions: React.FC<ExpanderComponentProps<MyDataType>> = ({ data }) => {
  return (
    <div>
      <Button>Some extra actions here in expand row</Button>
      {data.value} {data.id}
    </div>
  )
}

// See Table.tsx for all possible props
<Table<MyDataType>
  id={'table-1'}
  name={'My awesome table'}
  data={data}
  columns={columns}
  defaultSortField="value"
  noDataText="No data found"
  expandableRows
  expandableComponent={TableActions}
  config={config}
  onRowClicked={(row) => {
    // Navigate somewhere else on row click
    push(`/path/to/new/view`);
  }}
  // Any additional props to be included
  dataTableProps={{ defaultSortFieldId: 3, defaultSortAsc: false }}
/>
```
