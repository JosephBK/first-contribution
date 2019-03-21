# First Contribution

This action is a filter which determines if a pull request was opened by a first-time contributor.

## Usage

```workflow
workflow "Welcome Newcomers" {
  on = "pull_request"
  resolves = "Post Welcome Comment"
}

action "Filter Newcomers" {
  uses = "actions/first-contribution@v1.0.1"
  secrets = ["GITHUB_TOKEN"]
}

action "Post Welcome Comment" {
  uses = "actions/github@v1.0.0"
  needs = "Filter Newcomers"
  args = "comment Welcome, newcomer!"
  secrets = ["GITHUB_TOKEN"]
}
```

## Contributing

Check out [this doc](CONTRIBUTING.md).

## License

This action is released under the [MIT license](LICENSE.md).
Container images built with this project include third party materials. See [THIRD_PARTY_NOTICE.md](THIRD_PARTY_NOTICE.md) for details.

## Current Status

This action is in active development.
