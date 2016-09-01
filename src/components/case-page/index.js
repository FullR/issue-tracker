import React, {PropTypes} from "react";
import cx from "./style.css";
import bindComponent from "util/bind-component";
import Flex from "components/flex";
import IconButton from "material-ui/IconButton";
import AddBoxIcon from "material-ui/svg-icons/content/add-box";

const Column = Flex.bound({column: true});
const Row = Flex.bound({row: true});

const Container = Row.bound({grow: true, height: "100%"});
const Main = Row.bound({grow: true});
const MainColumn = Column.bound({grow: true});
const CaseList = Column.bound({grow: true});
const CaseListHeader = Row.bound({height: "5em", reverse: true, style: {zIndex: 2}});
const CaseListItems = Column.bound({grow: true, scrollable: true});
const AddCaseButton = (props) => (<IconButton {...props} tooltip="Create new case" tooltipPosition="bottom-center"><AddBoxIcon/></IconButton>);

const CaseListItem = Row.bound({minHeight: "10em"});

export default function CasePage(props) {
  const {
    cases=[],
    onCreateCase=window.noop,
    onSelectCase=window.noop,
    selectedCase
  } = props;
  const classNames = cx("root");

  return (
    <Container className={classNames}>
      <Main>
        <MainColumn>
          <CaseList>
            <CaseListHeader>
              <AddCaseButton onClick={onCreateCase}/>
            </CaseListHeader>
            <CaseListItems>
              {cases.map((c) =>
                <CaseListItem
                  key={c.id}
                  selected={c.id === selectedCase}
                  onClick={() => onSelectCase(c.id)}
                >
                  <div>{c.id}</div>
                  <div>{new Date(c.timestamp).toISOString()}</div>
                </CaseListItem>
              )}
            </CaseListItems>
          </CaseList>
        </MainColumn>
        <MainColumn>
          {selectedCase}
        </MainColumn>
      </Main>
    </Container>
  );
}

CasePage.propTypes = {
  cases: PropTypes.array,
  selectedCase: PropTypes.string,
  onCreateCase: PropTypes.func,
  onSelectCase: PropTypes.func
};
