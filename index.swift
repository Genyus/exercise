// Represents a single point as (x, y) coordinates
typealias Point = (x: Int, y: Int)

// Represents the configuration of the chart to be displayed
struct ChartConfig {
    struct Axis {
        struct Legend {
            let text: String
            var position: (x: Int, y: Int)?
        }
        var legend: Legend
        var max: Int?
        var size: Int?
    }
    var x: Axis
    var y: Axis
}

/**
 * Displays a chart for the given points
 * - parameter points: An array of points
 */
func displayChart(points: [Point]) {
    let COLUMN_WIDTH = 6
    
    /**
     * Gets a string key for a pair of coordinates
     * - parameter x: The X coordinate
     * - parameter y: The Y coordinate
     * - returns: The key
     */
    func getKey(x: Int, y: Int) -> String {
        return "[\(x),\(y)]"
    }
    
    /**
     * Gets the configuration values for the chart
     * - parameter points: The array of points to be charted
     * - returns: The configuration object
     */
    func getConfig(points: [Point]) -> ChartConfig {
        var config = ChartConfig(
            x: .init(legend: .init(text: "time")),
            y: .init(legend: .init(text: "£"))
        )
        
        // Calculate max x and max y values
        config.x.max = points.reduce(0) { max($0, $1.x) }
        config.y.max = points.reduce(0) { max($0, $1.y) }
        
        // Calculate overall x and y dimensions
        config.x.size = 3 + config.x.legend.text.count + (config.x.max! + 1) * COLUMN_WIDTH
        config.y.size = 2 + config.y.max!
        
        // Calculate x and y axis legend start points
        config.x.legend.position = (
            x: 2 + config.y.legend.text.count + ((config.x.max! + 1) * COLUMN_WIDTH) / 2 - config.x.legend.text.count / 2,
            y: config.y.size! - 1
        )
        config.y.legend.position = (
            x: 1,
            y: config.y.max! / 2 + 1
        )
        
        return config
    }
    
    /**
     * Renders the chart
     * - parameter config: The configuration object
     * - parameter points: The points array to be rendered
     */
    func render(config: ChartConfig, points: [Point]) {
        // Convert data array to Set
        let dataSet: Set<String> = Set(points.map { getKey(x: $0.x, y: $0.y) })
        let legendSequence = String(repeating: " ", count: config.y.legend.text.count + 2)
        let borderSequence = String(repeating: "*", count: COLUMN_WIDTH - 1)
        let cellSequence = String(repeating: " ", count: COLUMN_WIDTH - 1)
        
        // Render rows
        for row in (0...config.y.size! - 1).reversed() {
            // Render y legend
            let legend: String
            if row == config.y.legend.position!.y {
                legend = " \(config.y.legend.text) "
            } else {
                legend = legendSequence
            }
            
            // Render columns
            var columns = ""
            
            for col in 0...config.x.max! {
                let first: String
                let rest: String
                
                if dataSet.contains(getKey(x: col, y: row)) {
                    first = "*"
                } else if row == 0 || row == config.y.size! - 1 || col == 0 {
                    first = "+"
                } else {
                    first = " "
                }
                
                if row == 0 || row == config.y.size! - 1 {
                    rest = borderSequence
                } else {
                    rest = cellSequence
                }
                
                columns = "\(columns)\(first)\(rest)"
            }
            
            print("\(legend)\(columns)+")
        }
        
        // Render x legend
        let spaces = String(repeating: " ", count: config.x.legend.position!.x)
        print("\(spaces)\(config.x.legend.text)")
    }
    
    render(config: getConfig(points: points), points: points)
}

let data: [Point] = [
    (1, 2),
    (2, 3),
    (3, 1),
    (4, 6),
    (5, 8)
]

displayChart(points: data);
