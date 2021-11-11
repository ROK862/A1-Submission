import React from "react";
import styled from "styled-components";
import { sys } from "../../utils/helpers";

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
align-items: center;
    margin: auto;
    width: auto;
    display: table;
`;

const Documentation = styled.table``;

class DocumentComponent extends React.Component {
  render() {
    return (
      <Wrapper key={sys.getKey()}>
        <Title key={sys.getKey()}>{this.props.title}</Title>
        <Container key={sys.getKey()}>
          <RenderComponent key={sys.getKey()}>{this.props.component}</RenderComponent>
          <Documentation key={sys.getKey()}>
            <tbody>
            <tr key={sys.getKey()}>
              <th key={sys.getKey()}>Prop</th>
              <th key={sys.getKey()}>Description</th>
              <th key={sys.getKey()}>Type</th>
              <th key={sys.getKey()}>Default value</th>
            </tr>
            {this.props.propDocs.map((doc) => {
              return (
                <tr key={sys.getKey()}>
                  <td key={sys.getKey()}>{doc.prop}</td>
                  <td key={sys.getKey()}>{doc.description}</td>
                  <td key={sys.getKey()}>{doc.type}</td>
                  <td key={sys.getKey()}>
                    <code key={sys.getKey()}>{doc.defaultValue}</code>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </Documentation>
        </Container>
      </Wrapper>
    );
  }
}

export default DocumentComponent;
