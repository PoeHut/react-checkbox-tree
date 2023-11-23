import React, { useState } from "react";

const CheckboxTree = ({ data }) => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const keys = [];

  console.log("Selected Key >>> ", selectedKeys);

  const handleToggleChange = (keys) => {
    const newSet = new Set(selectedKeys);

    keys.forEach((key) => {
      newSet.has(key) ? newSet.delete(key) : newSet.add(key);
    });

    setSelectedKeys(Array.from(newSet));
  };

  const findChild = (node) => {
    !keys.includes(node.key) && keys.push(node.key);

    node.children &&
      node.children?.forEach((res) => {
        !keys.includes(res.key) && keys.push(res.key);

        if (res.children) {
          findChild(res);
        }
      });

    handleToggleChange(keys);
  };

  const handleCheckboxChange = (node, key) => {
    const getParentKey = (nodeKey) => {
      //!keys.includes(nodeKey) && keys.push(nodeKey);
      keys.push(nodeKey);
      for (const treeNode of data) {
        const parent = findParent(treeNode, nodeKey);

        if (parent) {
          getParentKey(parent.key);
          break;
        }
      }
    };

    getParentKey(key);
    findChild(node);
  };

  const findParent = (node, childKey) => {
    if (node.children) {
      for (const child of node.children) {
        if (child.key === childKey) {
          //!keys.includes(node.key) && keys.push(node.key);
          keys.push(node.key);
          return node;
        }

        const parent = findParent(child, childKey);

        if (parent) {
          //!keys.includes(parent.key) && keys.push(parent.key);
          keys.push(parent.key);
          return parent;
        }
      }

      handleToggleChange(keys);
    }
    return null;
  };

  const renderTreeNode = (treeNode) => {
    return treeNode?.map((node) => (
      <div key={node.key}>
        <input
          type="checkbox"
          value={node}
          checked={selectedKeys.includes(node.key)}
          onChange={() => handleCheckboxChange(node, node.key)}
        />
        <span>{node.title}</span>

        {node?.children && (
          <div style={{ marginLeft: 10 }}>{renderTreeNode(node?.children)}</div>
        )}
      </div>
    ));
  };

  return <div>{renderTreeNode(data)}</div>;
};

const App = () => {
  const treeData = [
    {
      key: "issuer",
      title: "Issuer",
      children: [
        {
          key: "issuerMgmt",
          title: "Issuer Management",
          children: [
            { key: "issuer.add", title: "Add" },
            { key: "issure.edit", title: "Edit" },
            { key: "issuer.delete", title: "Delete" },
            { key: "issuer.search", title: "Search" },
            { key: "issuer.sendMail", title: "Send Mail" },
          ],
        },
      ],
    },
    {
      key: "marketing",
      title: "Marketing",
      children: [
        {
          key: "userGroup",
          title: "User Group",
          children: [
            { key: "userGroup.add", title: "Add" },
            { key: "userGroup.edit", title: "Edit" },
            { key: "userGroup.delete", title: "Delete" },
            { key: "userGroup.search", title: "Search" },
          ],
        },
        {
          key: "limit",
          title: "Limit",
          children: [
            { key: "limit.add", title: "Add" },
            { key: "limit.edit", title: "Edit" },
            { key: "limit.delete", title: "Delete" },
            { key: "limit.search", title: "Search" },
          ],
        },
        {
          key: "rate",
          title: "Rate",
          children: [
            { key: "rate.add", title: "Add" },
            { key: "rate.edit", title: "Edit" },
            { key: "rate.delete", title: "Delete" },
            { key: "rate.search", title: "Search" },
          ],
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Checkbox Tree</h1>
      <CheckboxTree data={treeData} />
    </div>
  );
};

export default App;
