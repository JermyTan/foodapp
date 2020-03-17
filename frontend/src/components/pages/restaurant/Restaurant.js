import React from 'react';
import 'antd/dist/antd.css';
import { Card, Col, Row } from 'antd';

//get items


function Restaurant() {


  return (
    <main className="restaurant-page">
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    </main>
  );
}

export default Restaurant;