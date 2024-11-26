const RenderCountLabel = ({
    count,
    label,
  }: {
    count: number;
    label: string;
  }) => {
    return (
      <div>
        {label} renders: <span style={{ color: 'red' }}>{count}</span>
      </div>
    );
  };

  export default RenderCountLabel;