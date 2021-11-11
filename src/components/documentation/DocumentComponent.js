import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid #dddddd;
  margin: 20px 0px;
  border-radius: 0px;
  box-shadow: 0px 5px 9px 0px #0000003d;
  border-bottom: 2px solid #fe6c85;
`;

const Container = styled.div`
  justify-content: center;
  width: auto;
  height: 100%;
  overflow: hidden;
  background: white;
  padding: 50px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  font-size: 1.3rem;
`;

const RenderComponent = styled.div`
  padding: 25px;
  display: flex;
  align-items: center;
`;

const Documentation = styled.table``;

class DocumentComponent extends React.Component {
  render() {
    return (
      <Wrapper>
        <Title>{this.props.title}</Title>
        <Container>
          <RenderComponent>{this.props.component}</RenderComponent>
          <Documentation>
            <tr>
              <th>Prop</th>
              <th>Description</th>
              <th>Type</th>
              <th>Default value</th>
            </tr>
            {this.props.propDocs.map((doc) => {
              return (
                <tr>
                  <td>{doc.prop}</td>
                  <td>{doc.description}</td>
                  <td>{doc.type}</td>
                  <td>
                    <code>{doc.defaultValue}</code>
                  </td>
                </tr>
              );
            })}
          </Documentation>
        </Container>
      </Wrapper>
    );
  }
}

export default DocumentComponent;
