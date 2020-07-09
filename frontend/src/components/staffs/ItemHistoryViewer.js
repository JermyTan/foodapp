import React, { useState } from "react";
import { Item, Button, Icon, Container, Table } from "semantic-ui-react";
import { format, fromUnixTime } from "date-fns";

function ItemHistoryViewer(props) {
  const [viewItemHistory, setViewItemHistory] = useState(false);

  return (
    <div>
      <div>
        <Button
          icon
          labelPosition="left"
          floated="right"
          color="purple"
          onClick={() => {
            setViewItemHistory(!viewItemHistory);
          }}
        >
          <Icon name="book" />
          Item history
        </Button>
      </div>
      {viewItemHistory && (
        <Container>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Update time</Table.HeaderCell>
                <Table.HeaderCell>Available</Table.HeaderCell>
                <Table.HeaderCell singleLine>Item Name</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Image url</Table.HeaderCell>
                <Table.HeaderCell>Limit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {props.history.map((record) => {
                return (
                  <Table.Row>
                    <Table.Cell>
                      {format(
                        fromUnixTime(record.datetime),
                        "dd/mm/yyyy HH:mm:ss"
                      )}
                    </Table.Cell>
                    <Table.Cell>{record.avail ? "True" : "False"}</Table.Cell>
                    <Table.Cell>{record.fname}</Table.Cell>
                    <Table.Cell>${record.price}</Table.Cell>
                    <Table.Cell>{record.category}</Table.Cell>
                    <Table.Cell>{record.imgurl}</Table.Cell>
                    <Table.Cell>{record.flimit}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Container>
      )}
    </div>
  );
}

export default ItemHistoryViewer;
