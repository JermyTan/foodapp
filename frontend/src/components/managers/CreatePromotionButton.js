import React, { useState } from "react";
import { Button, Form, Modal, Message, Radio, Checkbox } from "semantic-ui-react";
import SavePromotion from "components/managers/SavePromotion";

function CreatePromotionButton() {
    const [isModalOpened, setModalOpened] = useState(false);
    const [startdate, setStartdate] = useState("");
    const [enddate, setEnddate] = useState("");
    const [discount, setDiscount] = useState("");
    const [didCreateSuccessfully, setCreateSuccessfully] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [toggle, setToggle] = useState(1);
    const [isChecked, setChecked] = useState(false);

    var finalDiscount = discount / 100;
    var epochStartDate = new Date(startdate.toString()).getTime();
    var epochEndDate = new Date(enddate.toString()).getTime();

    function toggleCheckBox() {
        switch (toggle) {
            case 0:
                setDiscount("")
                return false
            case 1:
                setDiscount(100)
                return true
        }
    }

    return (
        <Modal
            size="small"
            open={isModalOpened}
            onClose={() => setModalOpened(false)}
            trigger={
                <Button
                    // animated="vertical"
                    color="teal"
                    // disabled={Object.keys(props.selectedFoodItems).length === 0}
                    onClick={() => setModalOpened(true)}
                >
                    <Button.Content>Create New promotion</Button.Content>
                </Button>
            }
        >
            <Modal.Header>Create New Promotion</Modal.Header>

            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Input
                            label="Start Date (format: MM/dd/yyyy hh:mm aa)"
                            value={startdate}
                            onChange={(event, data) => {
                                setStartdate(data.value);
                            }}
                        />
                        <Form.Input
                            label="End Date (format: MM/dd/yyyy hh:mm aa)"
                            value={enddate}
                            onChange={(event, data) => {
                                setEnddate(data.value);
                            }}

                        />
                        <Form.Input
                            label="Discount (eg. input 50 for 50% off)"
                            value={discount}
                            onChange={(event, data) => {
                                console.log(data.value);
                                setDiscount(data.value);
                            }}
                        />
                        <Form.Checkbox
                            label="Free Delivery Promotion"
                            onChange={(event, data) => {
                                setChecked(toggleCheckBox())
                                setToggle(Math.abs(toggle - 1))
                            }}
                            checked={isChecked}
                        />
                    </Form>

                    {didCreateSuccessfully && (
                        <Message success
                            header="Promotion created successfully"
                            content="You may close the form"
                        />
                    )}

                    {createError && (
                        <Message error
                            header="Invalid input"
                            content="Please follow the format for each field"
                        />
                    )}

                </Modal.Description>
            </Modal.Content>

            <Modal.Actions>
                <Button
                    color="red"
                    content="Cancel"
                    onClick={() => {
                        setModalOpened(false)
                        setCreateSuccessfully(false)
                        setCreateError(false)
                        setDiscount("")
                        setStartdate("")
                        setEnddate("")
                    }}
                />
                <Button
                    color="blue"
                    content="Create"
                    onClick={() => {
                        SavePromotion(epochStartDate, epochEndDate, finalDiscount, setCreateError, setCreateSuccessfully)
                    }}
                />
            </Modal.Actions>
        </Modal>
    );
}

export default CreatePromotionButton;