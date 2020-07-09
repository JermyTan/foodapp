import React, { useState } from "react";
import { Button, Message } from "semantic-ui-react";
import axios from "axios";

function SaveItemChangesButton() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveItemChanges = () => {};

  return (
    <div>
      <Button
        onClick={saveItemChanges}
        loading={loading}
        floated="right"
        color="green"
        icon="save"
      />
      {saved && <Message></Message>}
    </div>
  );
}
